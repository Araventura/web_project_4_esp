// all info of card should be exported to index.js
//produce una tarjeta y enlace a la imagen, aqui se produce la card??
//tiene metodos privados para cada event listener
//funcion que produce una card y  enlace a la imagen

import { PopupWithForm } from "./PopupWithForm";

export class Card {
  _text = "";
  _url = "";
  _className = "";

  constructor(text, url, className, handleCardClick) {
    this._text = text;
    this._url = url;
    this._className = className;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector("#" + this._className)
      .content.querySelector(".card__item")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this.element = this._getTemplate();
    const cardImage = this.element.querySelector(".card__image");
    const cardLikeButton = this.element.querySelector(
      ".card__wrapper .card__like"
    );

    const cardTrashButton = this.element.querySelector(".card__trash");

    cardTrashButton.addEventListener("click", () => {
      const popupDeleteImage = new PopupWithForm(
        this._handleDeleteCard,
        "#popup-delete-image"
      );
      popupDeleteImage.open();
    });

    cardImage.addEventListener("click", this._handleCardClick);
    cardLikeButton.addEventListener("click", this._cardLikeButton.bind(this));

    this.element.querySelector(".card__wrapper .card__title").textContent =
      this._text;

    cardImage.alt = this._text;
    cardImage.src = this._url;

    return this.element;
  }

  //aqui iria la clase de form-delete-image

  _cardLikeButton(e) {
    const cardImage = this.element.querySelector(".card__like");
    cardImage.classList.toggle("card__like_active");
    //aqui se agregaria el count like
  }

  _handleDeleteCard(e) {
    console.log(e.target);
    e.target.closest(".card__item").remove();
  }
}
