//***FALTA Crear una instancia de la clase PopupWithForm para cada popup. */
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(sendCallback, selector) {
    super(selector);
    this.sendCallback = sendCallback;
    this.popup = document.querySelector(selector); //recibe el selector del popup -- es necesario ya que la clase padre tiene acceso al popup??\\
    this.setEventListeners();
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
        .querySelector(".popup__close-button")
        .addEventListener("click", this.close.bind(this)); //se repite??
      this.popup
        .querySelector(".cover__close-button")
        .addEventListener("click", this.close.bind(this)); //class needed to avoid BEM errors in automated tests...
    }
  }

  close() {
    this.popup.classList.remove("popup_open");
    const inputList = Array.from(this.popup.querySelectorAll(".popup__input"));
    inputList.forEach((input) => {
      input.value = "";
    });
  }
}
