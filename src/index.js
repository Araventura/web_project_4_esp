//function imported for cards to be shown properly.
import "./pages/index.css";
import { FormValidator } from "./pages/components/FormValidator";
import { Card } from "./pages/components/Card.js";
import { setupEventListeners } from "./pages/utils.js";
import { PopupWithImage } from "./pages/components/PopupWithImage.js";
import headerImg from "./images/Headerimg.png";
import { Api } from "./pages/components/Api.js";

const popupWithImage = new PopupWithImage(".cover");
const headerImage = document.getElementById("header-image");
headerImage.src = headerImg;

const api = new Api(
  "https://around.nomoreparties.co/v1/web_es_05",
  "fccf719e-8a78-41bc-841c-fef7866c1b1f"
);

api
  .getUserData()
  .then((res) => {
    return api.handleResponse(res);
  })
  .then((res) => {
    const profilename = document.querySelector(".profile__name");
    const avatar = document.querySelector(".profile__pic-img");
    const about = document.querySelector(".profile__description");
    profilename.innerHTML = res.name;
    avatar.src = res.avatar; // need editing on image.
    about.innerHTML = res.about;
  })
  .catch(() => {
    console.log("Hola there was an error");
  });

api
  .loadCards()
  .then((res) => {
    return api.handleResponse(res);
  })
  .then((res) => {
    refreshCards(res);
  });

//  Render initial cards
// Function render Initial Cards obtains data for each and every card available in the object.
export function refreshCards(cards) {
  const cardList = document.querySelector(".card");
  cardList.innerHTML = "";

  cards.forEach((dataCard) => {
    const card = new Card(
      dataCard.name,
      dataCard.link,
      "card_template",
      (e) => {
        // funcion que llama a popupwithImage & open y pasa el evento como parametro
        popupWithImage.open(e);
      },
      dataCard.likes,
      dataCard._id,
      dataCard.owner._id
    );

    const cardElement = card.generateCard();

    cardList.append(cardElement);
  });
}

function setupValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((form) => {
    const formClasses = {
      popupInputSelector: ".popup__input",
    };

    const validator = new FormValidator(formClasses, form);
    validator.enableValidation();
  });
}

setupValidation();
setupEventListeners();
