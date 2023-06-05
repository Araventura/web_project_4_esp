import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(e) {
    const image = e.target;
    this.popup.classList.add("popup_open");
    this.popup.querySelector(".cover__image").src = image.src;
    this.popup.querySelector(".cover__subtitle").textContent = image.alt;
  }
}
