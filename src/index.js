//function imported for cards to be shown properly.
import "./pages/index.css";
import { FormValidator } from "./pages/FormValidator.js";
import { Card } from "./pages/Card.js";
import { setupEventListeners } from "./pages/utils.js";
import { PopupWithImage } from "./pages/PopupWithImage.js";
import headerImg from "./images/Headerimg.png";

const headerImage = document.getElementById("header-image");
headerImage.src = headerImg;

const popupWithImage = new PopupWithImage(".cover");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    alt: "Valle de Yosemite",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    alt: "Lago Louise",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    alt: "Montañas Calvas",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    alt: "Latemar",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    alt: "Parque Nacional de la Vanoise",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    alt: "Lake di Braies",
  },
];

//  Render initial cards
// Function render Initial Cards obtains data for each and every card available in the object.
function renderInitialCards() {
  initialCards.forEach((dataCard) => {
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
renderInitialCards();
setupEventListeners();
