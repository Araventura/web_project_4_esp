//function imported for cards to be shown properly.
import "./pages/index.css";
import { FormValidator } from "./pages/components/FormValidator";
import { Card } from "./pages/components/Card.js";
import { setupEventListeners } from "./pages/utils.js";
import { PopupWithImage } from "./pages/components/PopupWithImage.js";
import headerImg from "./images/Headerimg.png";
import { Api } from "./pages/components/Api.js";

const headerImage = document.getElementById("header-image");
headerImage.src = headerImg;

const popupWithImage = new PopupWithImage(".cover");

const api = new Api(
  "https://around.nomoreparties.co/v1/web_es_05",
  "fccf719e-8a78-41bc-841c-fef7866c1b1f"
);

api
  .getUserData()
  .then((res) => {
    return res.json();
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
    console.log("Hola error");
  });

api
  .loadCards()
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    renderInitialCards(res);
  });

//  Render initial cards
// Function render Initial Cards obtains data for each and every card available in the object.
function renderInitialCards(cards) {
  cards.forEach((dataCard) => {
    const card = new Card(
      dataCard.name,
      dataCard.link,
      "card_template",
      (e) => {
        // funcion que llama a popupwithImage & open y pasa el evento como parametro
        popupWithImage.open(e);
      }
    );

    const cardElement = card.generateCard();
    document.querySelector(".card").prepend(cardElement);
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
//renderInitialCards();
setupEventListeners();
