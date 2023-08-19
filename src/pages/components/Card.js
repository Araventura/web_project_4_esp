// all info of card should be exported to index.js
//produce una tarjeta y enlace a la imagen, aqui se produce la card??
//tiene metodos privados para cada event listener
//funcion que produce una card y  enlace a la imagen

import { PopupWithForm } from "./PopupWithForm";
import { Api } from "./Api";

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
    this._api = new Api(
      "https://around.nomoreparties.co/v1/web_es_05",
      "fccf719e-8a78-41bc-841c-fef7866c1b1f"
    );
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

    if (this._userId != "aff1383f05db104e89f933b0") {
      //este ID es el que se loggea como el owner ID
      cardTrashButton.classList.add("card__trash_display_hide");
    }

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
    this._updateLikeStatus();
    return this.element;
  }

  //aqui iria la clase de form-delete-image

  _cardLikeButton(e) {
    if (this._likes.some((like) => like._id === "aff1383f05db104e89f933b0")) {
      // quitar del array

      let index = -1;
      this._likes.forEach((like, i) => {
        if (like._id === "aff1383f05db104e89f933b0") {
          index = i;
        }
      });
      this._likes.splice(index, 1);
      this._cardDislike();
      //hace toggle para quitarlo del array
    } else {
      const likeObject = {
        name: "ara",
        about: "Sailor, webdev",
        avatar:
          "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
        _id: "aff1383f05db104e89f933b0",
        cohort: "web_es_05",
      };
      this._likes.push(likeObject);
      this._cardLike();
    }
    //aqui se agregaria el count like
  }

  _handleDeleteCard() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this.element.remove();
        this._popup.close();
        document.querySelector("#delete-image-button").textContent = "Si";
      })
      .catch((res) => console.log("Error deleting image" + res));
    document.querySelector("#delete-image-button").textContent = "Borrando...";
  }

  _setCardLikes() {
    const cardLike = this.element.querySelector(".card__counter_likes");
    cardLike.textContent = this._likes.length;
  }

  _cardDislike() {
    const cardImage = this.element.querySelector(".card__like");
    this._api
      .cardDislike(this._id)
      .then(() => {
        cardImage.classList.remove("card__like_active");
        this._setCardLikes();
      })
      .catch((res) => console.log("Error disliking image" + res));
  }

  _cardLike() {
    const cardImage = this.element.querySelector(".card__like");
    this._api
      .cardLike(this._id)
      .then(() => {
        cardImage.classList.add("card__like_active");
        this._setCardLikes();
      })
      .catch((res) => console.log("Error liking image" + res));
  }

  _updateLikeStatus() {
    const cardImage = this.element.querySelector(".card__like");
    if (this._likes.some((like) => like._id === "aff1383f05db104e89f933b0")) {
      cardImage.classList.add("card__like_active");
    } else {
      cardImage.classList.remove("card__like_active");
    }
  }
}
