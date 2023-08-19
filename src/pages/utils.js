//controladores de eventos & funcion que abre &cierra las ventanas modales se exportan
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Api } from "./components/Api.js";
import { refreshCards } from "../index.js";

const popupWithImage = new PopupWithImage(".cover");

const handleAddCard = (e) => {
  const api = new Api(
    "https://around.nomoreparties.co/v1/web_es_05",
    "fccf719e-8a78-41bc-841c-fef7866c1b1f"
  );

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
    },
    [],
    "",
    "aff1383f05db104e89f933b0" //pasar el resto de los parametros AQUI
  );
  //pasar funcion que crea card y popula con info la nueva card
  //const

  //API is called to save card
  api
    .addCard(titleInput.value, urlInput.value)
    .then((res) => {
      const cardElement = card.generateCard();
      document.querySelector(".card").prepend(cardElement);
      return res.json();
    })
    .then((res) => {
      api
        .loadCards()
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          refreshCards(res);
        });
      console.log(res);
    });

  //pone card antes de lista de cards

  addCardPopup.close();
};

const editProfilePopup = new PopupWithForm(
  saveProfileDetails,
  "#popup-profile"
);

const addCardPopup = new PopupWithForm(handleAddCard, "#popup-card");

const updateProfilePicPopup = new PopupWithForm(
  updateProfilePic,
  "#popup-edit-profile-pic"
);

//this function adds event listeners to buttons on app load
export function setupEventListeners() {
  //se selecciona el boton de edit profile + agrega event listener + classListadd popup__open
  const editButton = document.querySelector(".profile__button-edit");
  const closeAddButton = document.querySelector("#popup-close-add-card");
  const addButton = document.querySelector(".profile__button-add");
  const editProfilePicButton = document.querySelector(".profile__pic");

  //open edit profile pic popup
  editProfilePicButton.addEventListener("click", handleEditProfilePic);
  //OPEN edit popupProfile -
  editButton.addEventListener("click", handleEditButton);

  //This function resuses popup to add a card
  addButton.addEventListener("click", openAddCardPopup);

  //closeAddButton
  //function that closes add popup when clicked
  closeAddButton.addEventListener("click", closeAddCardPopup);
}

//PROFILE PIC
//function to open popup when editing profile pic
function handleEditProfilePic() {
  updateProfilePicPopup.open();
}

//option to update URL for profile pic
function updateProfilePic() {
  const avatarUrl = document.querySelector("#input-avatar-url");
  const api = new Api(
    "https://around.nomoreparties.co/v1/web_es_05",
    "fccf719e-8a78-41bc-841c-fef7866c1b1f"
  );
  api.updateProfilePic(avatarUrl.value).then(() => {
    const imageElement = document.querySelector(".profile__pic-img");
    imageElement.src = avatarUrl.value;
  });
  //document.querySelector()
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
  const api = new Api(
    "https://around.nomoreparties.co/v1/web_es_05",
    "fccf719e-8a78-41bc-841c-fef7866c1b1f"
  );
  const nameInput = document.querySelector("#input-name");
  const profileInfo = document.querySelector(".profile__description");
  const profileName = document.querySelector(".profile__name");
  const descriptionInput = document.querySelector("#input-description");

  e.preventDefault();

  api
    .editProfile(nameInput.value, descriptionInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileInfo.textContent = descriptionInput.value;
      editProfilePopup.close();
    })
    .catch((res) => {
      console.log("Error saving: ", res);
    });
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
