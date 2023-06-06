//abre y cierra ventana emergente

export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.removeEventListeners();
    this.setEventListeners();
  }

  open() {
    this.popup.classList.add("popup_open");
  }

  close() {
    this.popup.classList.remove("popup_open");
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
        .querySelector(".popup__backdrop")
        .addEventListener("click", this.close.bind(this));

      window.addEventListener("keydown", this._handleEscClose.bind(this));
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
    }
  }
}
