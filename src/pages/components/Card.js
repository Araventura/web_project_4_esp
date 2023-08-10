// all info of card should be exported to index.js
//produce una tarjeta y enlace a la imagen, aqui se produce la card??
//tiene metodos privados para cada event listener
//funcion que produce una card y  enlace a la imagen

import { PopupWithForm } from "./PopupWithForm";

export class Card {
  _text = "";
  _url = "";
  _className = "";
  _likes = [];
  _id = "";
  _popup = null;
  _userId = "";

  constructor(text, url, className, handleCardClick, likes, id, userId) {
    this._text = text;
    this._url = url;
    this._className = className;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._id = id;
    this._popup = new PopupWithForm(
      this._handleDeleteCard.bind(this),
      "#popup-delete-image"
    );
    this._userId = userId;
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
    this.element.setAttribute("id", this._id);
    const cardImage = this.element.querySelector(".card__image");
    const cardLikeButton = this.element.querySelector(
      ".card__wrapper .card__like"
    );
    const cardTrashButton = this.element.querySelector(".card__trash");

    cardTrashButton.addEventListener("click", (e) => {
      this._popup.open(this._id);
    });

    cardImage.addEventListener("click", this._handleCardClick);
    cardLikeButton.addEventListener("click", this._cardLikeButton.bind(this));

    this.element.querySelector(".card__wrapper .card__title").textContent =
      this._text;

    cardImage.alt = this._text;
    cardImage.src = this._url;
    this._setCardLikes();
    return this.element;
  }

  //aqui iria la clase de form-delete-image

  _cardLikeButton(e) {
    const cardImage = this.element.querySelector(".card__like");

    if (this._likes.includes("fccf719e-8a78-41bc-841c-fef7866c1b1f")) {
      // quitar del array
      const index = this._likes.indexOf("fccf719e-8a78-41bc-841c-fef7866c1b1f");
      this._likes.splice(index, 1);
      //hace toggle para quitarlo del array
    } else {
      this._likes.push("fccf719e-8a78-41bc-841c-fef7866c1b1f");
    }
    this._setCardLikes();
    cardImage.classList.toggle("card__like_active");
    //aqui se agregaria el count like
  }

  _handleDeleteCard() {
    //console.log(this.element);
    //document.getElementById(this._id).remove();
    this.element.remove();
    this._popup.close();
  }

  _setCardLikes() {
    const cardLike = this.element.querySelector(".card__counter_likes");
    cardLike.textContent = this._likes.length;
  }
}
