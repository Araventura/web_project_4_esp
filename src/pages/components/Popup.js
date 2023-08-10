//  abre y cierra ventana emergente
// adds "escape" event listerer

export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.addClassesToCloseButton();
    this.removeEventListeners();
    this.setEventListeners();
  }

  open() {
    this.popup.classList.add("popup_open");
  }

  close() {
    this.popup.classList.remove("popup_open");
    this.removeEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    if (this.popup != null) {
      this.popup
        .querySelector(".popup__close-button")
        .addEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".cover__close-button") //class added to avoid errors with BEM on automated tests
        .addEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".popup__backdrop")
        .addEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".cover__backdrop") //class added to avoid errors with BEM on automated tests
        .addEventListener("click", this.close.bind(this));

      window.addEventListener("keydown", this._handleEscClose.bind(this));
    }
  }

  removeEventListeners() {
    if (this.popup != null) {
      this.popup
        .querySelector(".cover__close-button") //class added to avoid errors with BEM on automated tests
        .removeEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".cover__backdrop") //class added to avoid errors with BEM on automated tests
        .removeEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".popup__close-button")
        .removeEventListener("click", this.close.bind(this));
      this.popup
        .querySelector(".popup__backdrop")
        .removeEventListener("click", this.close.bind(this));

      window.removeEventListener("keydown", this._handleEscClose.bind(this));
    }
  }
  //funcion que agrega clases al boton de cerrar
  addClassesToCloseButton() {
    this.popup
      .querySelector(".popup__close-button")
      ?.classList.add("cover__close-button");
    this.popup
      .querySelector(".cover__close-button")
      ?.classList.add("popup__close-button");
    this.popup
      .querySelector(".popup__backdrop")
      ?.classList.add("cover__backdrop");
    this.popup
      .querySelector(".cover__backdrop")
      ?.classList.add("popup__backdrop");
  }
}
