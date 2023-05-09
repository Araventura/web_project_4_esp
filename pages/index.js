//function imported for cards to be shown properly.
import {
  enableValidation,
  resetInputValidation,
  toggleFormButton,
} from "./validate.js";

import { Card } from "./Card.js";

const popupProfile = document.querySelector("#popup-profile");
const popupAddCard = document.querySelector("#popup-card");
const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__description");
const nameInput = document.querySelector("#input-name");
const descriptionInput = document.querySelector("#input-description");
// const coverExitButton = document.querySelector("#cover-close-button"); ---UTILS

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
    const card = new Card(dataCard.name, dataCard.link, "card_template");
    const cardElement = card.generateCard();
    document.querySelector(".card").prepend(cardElement);
  });
}

// openFullScreenImage
// Function that opens image and centers it
// ------CARD-----
// function openFullScreenImage(e) {
//   cover.classList.add("cover_clicked");
//   cover.querySelector(".cover__image").src = e.target.src;
//   cover.querySelector(".cover__subtitle").textContent = e.target.alt;
// ------UTILS-----
//   coverExitButton.addEventListener("click", closeFullScreenImage);
// }

// closeFullScreenImage
// Removes the image focus from the center of the page.
// ------UTILS?-----
// function closeFullScreenImage() {
//   cover.classList.remove("cover_clicked");
// }

function closeProfilePopup() {
  popupProfile.classList.remove("popup_open");
  document.removeEventListener("keydown", closeOnEscape);
}

function closeAddCardPopup() {
  popupAddCard.classList.remove("popup_open");
  document.removeEventListener("keydown", closeOnEscape);
}

function showProfilePopup() {
  popupProfile.classList.add("popup_open");
}

function showAddCardPopup() {
  popupAddCard.classList.add("popup_open");
}

// handleEditButton
// displays a window for user to modify profile info, it will be reused to add a card
function handleEditButton() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileInfo.textContent;
  const form = document.querySelector("#form-edit-profile");
  document.addEventListener("keydown", closeOnEscape);
  resetInputValidation(popupProfile);
  toggleFormButton(form);
  showProfilePopup();
}

//saveProfileDetails
// When clicked, saves edited data from profile info.

function saveProfileDetails(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = descriptionInput.value;

  closeProfilePopup();
}

function openAddCardPopup() {
  const titleInput = document.querySelector("#input-title");
  const descriptionInput = document.querySelector("#input-url");
  document.addEventListener("keydown", closeOnEscape);

  titleInput.setAttribute("placeholder", "Titulo");
  descriptionInput.setAttribute("placeholder", "Enlace a la imagen");

  titleInput.value = "";
  descriptionInput.value = "";
  const form = document.querySelector("#form-card");
  resetInputValidation(popupAddCard);
  toggleFormButton(form);
  showAddCardPopup();
}

//this function adds event listeners to buttons on app load
function setupEventListeners() {
  const createCardButton = document.querySelector("#create-card-button");
  const saveProfileButton = document.querySelector(".popup__button");
  const editButton = document.querySelector(".profile__button-edit");
  const closeProfileButton = document.querySelector("#popup-close-profile");
  const closeAddButton = document.querySelector("#popup-close-add-card");
  const addButton = document.querySelector(".profile__button-add");

  //backdrop event listener
  const popupBackdrops = Array.from(
    document.querySelectorAll(".popup__backdrop")
  );
  popupBackdrops.forEach((backdrop) => {
    const isAddCardPopup = backdrop.closest("#popup-card");
    const isEditProfile = backdrop.closest("#popup-profile");

    if (isAddCardPopup) {
      backdrop.addEventListener("click", closeAddCardPopup);
    } else if (isEditProfile) {
      backdrop.addEventListener("click", closeProfilePopup);
    }
  });

  //OPEN edit popupProfile -
  editButton.addEventListener("click", handleEditButton);

  //This function resuses popup to add a card
  addButton.addEventListener("click", openAddCardPopup);

  // closeProfilePopup
  // Closes popupProfile window when clicked

  closeProfileButton.addEventListener("click", closeProfilePopup);

  //closeAddButton
  //function that closes add popup when clicked
  closeAddButton.addEventListener("click", closeAddCardPopup);
  createCardButton.addEventListener("click", addCard);
  saveProfileButton.addEventListener("click", saveProfileDetails);
}

const closeOnEscape = (e) => {
  if (e.key === "Escape") {
    closeAddCardPopup();
    closeProfilePopup();
  }
};

// prevents popup from showing when reloading website.
document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  page.classList.remove("preload");
});

enableValidation({
  formSelector: ".form",
  popupInputSelector: ".popup__input",
});

renderInitialCards();
setupEventListeners();
