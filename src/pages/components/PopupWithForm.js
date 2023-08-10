import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(sendCallback, selector) {
    super(selector);
    this.sendCallback = sendCallback;
    this.popup = document.querySelector(selector); //recibe el selector del popup -- es necesario ya que la clase padre tiene acceso al popup\\
  }

  _getInputValues() {
    const inputList = popup.querySelectorAll(".popup__input");
  }

  setEventListeners() {
    if (this.popup != null) {
      this.popup
        .querySelector(".popup__close-button")
        .addEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".popup__backdrop")
        .addEventListener("click", this.close.bind(this));
      window.addEventListener("keydown", this._handleEscClose.bind(this));
      this.popup
        .querySelector(".cover__backdrop") //class needed to avoid errors on automated tests - errors with BEM...
        .addEventListener("click", this.close.bind(this));
      window.addEventListener("keydown", this._handleEscClose.bind(this));
      this.popup
        .querySelector(".form")
        .addEventListener("submit", this.sendCallback);
      this.popup
        .querySelector(".cover__close-button")
        .addEventListener("click", this.close.bind(this)); //class needed to avoid BEM errors in automated tests...
    }
  }

  removeEventListeners() {
    if (this.popup != null) {
      this.popup
        .querySelector(".popup__close-button")
        .removeEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".popup__backdrop")
        .removeEventListener("click", this.close.bind(this));
      window.removeEventListener("keydown", this._handleEscClose.bind(this));
      this.popup
        .querySelector(".cover__backdrop") //class needed to avoid errors on automated tests - errors with BEM...
        .removeEventListener("click", this.close.bind(this));
      window.removeEventListener("keydown", this._handleEscClose.bind(this));
      this.popup
        .querySelector(".form")
        .removeEventListener("submit", this.sendCallback);
      this.popup
        .querySelector(".cover__close-button")
        .removeEventListener("click", this.close.bind(this)); //class needed to avoid BEM errors in automated tests...
    }
  }

  open() {
    this.setEventListeners();
    this.popup.classList.add("popup_open");
  }

  close() {
    this.removeEventListeners();
    this.popup.classList.remove("popup_open");
    const inputList = Array.from(this.popup.querySelectorAll(".popup__input"));
    inputList.forEach((input) => {
      input.value = "";
    });
  }
}
