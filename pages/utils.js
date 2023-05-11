//controladores de eventos & funcion que abre &cierra las ventanas modales se exportan
import { FormValidator } from "./FormValidator.js";

import { Card } from "./Card.js";

//this function adds event listeners to buttons on app load
export function setupEventListeners() {
  const createCardButton = document.querySelector("#create-card-button");
  const saveProfileButton = document.querySelector(".popup__button");
  const editButton = document.querySelector(".profile__button-edit");
  const closeProfileButton = document.querySelector("#popup-close-profile");
  const closeAddButton = document.querySelector("#popup-close-add-card");
  const addButton = document.querySelector(".profile__button-add");
  const coverExitButton = document.querySelector("#cover-close-button");

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
  createCardButton.addEventListener("click", handleAddCard);
  saveProfileButton.addEventListener("click", saveProfileDetails);
  coverExitButton.addEventListener("click", closeFullScreenImage);
}

function closeProfilePopup() {
  const popupProfile = document.querySelector("#popup-profile");
  popupProfile.classList.remove("popup_open");
  document.removeEventListener("keydown", closeOnEscape);
}

function closeAddCardPopup() {
  const popupAddCard = document.querySelector("#popup-card");

  popupAddCard.classList.remove("popup_open");
  document.removeEventListener("keydown", closeOnEscape);
}

function showProfilePopup() {
  const popupProfile = document.querySelector("#popup-profile");
  popupProfile.classList.add("popup_open");
}

function showAddCardPopup() {
  const popupAddCard = document.querySelector("#popup-card");
  popupAddCard.classList.add("popup_open");
}

// handleEditButton
// displays a window for user to modify profile info, it will be reused to add a card
function handleEditButton() {
  const nameInput = document.querySelector("#input-name");
  const descriptionInput = document.querySelector("#input-description");
  const profileInfo = document.querySelector(".profile__description");
  const popupProfile = document.querySelector("#popup-profile");
  const profileName = document.querySelector(".profile__name");

  const formClasses = {
    popupInputSelector: ".popup__input",
  };

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileInfo.textContent;
  const form = document.querySelector("#form-edit-profile");
  document.addEventListener("keydown", closeOnEscape);
  showProfilePopup();

  const validator = new FormValidator(formClasses, form);
  validator.toggleFormButton();
  validator.resetInputValidation(popupProfile);
}

//saveProfileDetails
// When clicked, saves edited data from profile info.

function saveProfileDetails(e) {
  const nameInput = document.querySelector("#input-name");
  const profileInfo = document.querySelector(".profile__description");
  const profileName = document.querySelector(".profile__name");
  const descriptionInput = document.querySelector("#input-description");

  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = descriptionInput.value;

  closeProfilePopup();
}

function openAddCardPopup() {
  const titleInput = document.querySelector("#input-title");
  const descriptionInput = document.querySelector("#input-url");
  const popupAddCard = document.querySelector("#popup-card");

  document.addEventListener("keydown", closeOnEscape);

  const formClasses = {
    popupInputSelector: ".popup__input",
  };

  titleInput.setAttribute("placeholder", "Titulo");
  descriptionInput.setAttribute("placeholder", "Enlace a la imagen");

  titleInput.value = "";
  descriptionInput.value = "";
  const form = document.querySelector("#form-card");
  showAddCardPopup();

  const validator = new FormValidator(formClasses, form);
  validator.toggleFormButton();
  validator.resetInputValidation(popupAddCard);
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

// closeFullScreenImage
// Removes the image focus from the center of the page.
function closeFullScreenImage() {
  cover.classList.remove("cover_clicked");
}

const handleAddCard = (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#input-title");
  const urlInput = document.querySelector("#input-url");
  //selecciona a los inputs
  const card = new Card(titleInput.value, urlInput.value, "card_template");
  //pasar funcion que crea card y popula con info la nueva card
  const cardElement = card.generateCard();
  //pon card antes de lista de cards
  document.querySelector(".card").prepend(cardElement);

  closeAddCardPopup();
};
