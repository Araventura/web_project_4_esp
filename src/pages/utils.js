//controladores de eventos & funcion que abre &cierra las ventanas modales se exportan
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";

const popupWithImage = new PopupWithImage(".cover");

const handleAddCard = (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#input-title");
  const urlInput = document.querySelector("#input-url");
  //selecciona a los inputs
  const card = new Card(
    titleInput.value,
    urlInput.value,
    "card_template",
    (e) => {
      // funcion que llama a popupwithImage & open y pasa el evento como parametro
      popupWithImage.open(e);
    }
  );
  //pasar funcion que crea card y popula con info la nueva card
  const cardElement = card.generateCard();
  //pon card antes de lista de cards
  document.querySelector(".card").prepend(cardElement);

  addCardPopup.close();
};

const editProfilePopup = new PopupWithForm(
  saveProfileDetails,
  "#popup-profile"
);

const addCardPopup = new PopupWithForm(handleAddCard, "#popup-card");

//this function adds event listeners to buttons on app load
export function setupEventListeners() {
  const editButton = document.querySelector(".profile__button-edit");
  const closeAddButton = document.querySelector("#popup-close-add-card");
  const addButton = document.querySelector(".profile__button-add");

  //OPEN edit popupProfile -
  editButton.addEventListener("click", handleEditButton);

  //This function resuses popup to add a card
  addButton.addEventListener("click", openAddCardPopup);

  //closeAddButton
  //function that closes add popup when clicked
  closeAddButton.addEventListener("click", closeAddCardPopup);
}

function closeAddCardPopup() {
  addCardPopup.close();
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

  editProfilePopup.open();

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

  editProfilePopup.close(); // reemplazar por
}

function openAddCardPopup() {
  const titleInput = document.querySelector("#input-title");
  const descriptionInput = document.querySelector("#input-url");
  const popupAddCard = document.querySelector("#popup-card");

  const formClasses = {
    popupInputSelector: ".popup__input",
  };

  titleInput.setAttribute("placeholder", "Titulo");
  descriptionInput.setAttribute("placeholder", "Enlace a la imagen");

  titleInput.value = "";
  descriptionInput.value = "";
  const form = document.querySelector("#form-card");
  addCardPopup.open();

  const validator = new FormValidator(formClasses, form);
  validator.toggleFormButton();
  validator.resetInputValidation(popupAddCard);
}

// prevents popup from showing when reloading website.
document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  page.classList.remove("preload");
});
