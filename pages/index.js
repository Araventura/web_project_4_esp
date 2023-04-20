const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__button-edit");
const saveButton = document.querySelector(".popup__button");
const exitButton = document.querySelector(".popup__close-button");
const likeButtons = document.querySelectorAll(".card__like");
const addButton = document.querySelector(".profile__button-add");
const profileName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__description");
const nameInput = document.querySelector("#input-name");
const descriptionInput = document.querySelector("#input-description");
const cardTemplate = document.querySelector("#card_template");
const cardContainer = document.querySelector(".card");
const popupTitle = document.querySelector(".popup__title");
const cover = document.querySelector(".cover")
const coverExitButton = document.querySelector("#cover-close-button");


const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
      alt: "Valle de Yosemite"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
      alt: "Lago Louise"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
      alt: "Montañas Calvas"
    },
    {
      name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
      alt: "Latemar"
    },
    {
      name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
      alt: "Parque Nacional de la Vanoise"
    },
    {
      name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
      alt: "Lake di Braies"
    }
]


//  Render initial cards
// Function render Initial Cards obtains data for each and every card available in the object.
function renderInitialCards() {
    initialCards.forEach((dataCard) => {
        renderCard(dataCard, cardContainer)
    })
}

// renderCard
// This function obtains one card and adds it at the beginning of the objetc
function renderCard(data, cardContainer) {
    cardContainer.prepend(getCardElement(data))
}

// getCardElement
// This function creates card element using template from HTML
function getCardElement(data) {
    const cardTemplateContent = cardTemplate.content.querySelector(".card__item");
    const cardElement = cardTemplateContent.cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const cardButton = cardElement.querySelector(".card__like");
    const cardTrash = cardElement.querySelector(".card__trash");

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.addEventListener("click", openFullScreenImage);
    cardImage.alt = data.alt;
    cardButton.addEventListener("click", clickLike);
    cardTrash.addEventListener("click", deleteCard);

    return cardElement;
}

// openFullScreenImage
// Function that opens image and centers it

function openFullScreenImage(e) {
    cover.classList.add("cover_clicked")
    cover.querySelector(".cover__image").src = e.target.src;
    cover.querySelector(".cover__subtitle").textContent = e.target.alt;
    coverExitButton.addEventListener("click", closeFullScreenImage);

}

// closeFullScreenImage
// Removes the image focus from the center of the page.
function closeFullScreenImage() {
    cover.classList.remove("cover_clicked");
}

// clickLike
//Like button - sets it as liked or unliked when clicked

function clickLike(e) {
    e.target.classList.toggle("card__like_active");
}

// deleteCard
//Trash button - deletes image completely.

function deleteCard(e) {
    console.log(e.target);
    e.target.closest(".card__item").remove();
}


// closePopup
// Closes popup window when clicked

exitButton.addEventListener("click", closePopup)

function closePopup() {
    popup.classList.remove("popup_open");

}

//OPEN edit popup -
editButton.addEventListener("click", handleEditButton)

function openPopup() {
    popup.classList.add("popup_open");
}


// handleEditButton
// displays a window for user to modify profile info, it will be reused to add a card
function handleEditButton() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileInfo.textContent;
    popupTitle.textContent = "Editar Perfil";
    saveButton.textContent = "Guardar";

  // This is to remove event listener that was added in openAddCardPopup
    saveButton.removeEventListener("click", addCard)
    saveButton.addEventListener("click", saveProfileDetails)
    openPopup();
}

//saveProfileDetails 
// When clicked, saves edited data from profile info. 

function saveProfileDetails() {

  profileName.textContent = nameInput.value;
  profileInfo.textContent = descriptionInput.value;

  closePopup();

}

//This function resuses popup to add a card
addButton.addEventListener("click", openAddCardPopup)

function openAddCardPopup() {
    openPopup();
    const popupCreate = document.querySelector(".popup__button");
    const nameInput = document.querySelector("#input-name");
    const descriptionInput = document.querySelector("#input-description");

    popupTitle.textContent = "Nuevo Lugar";
    popupCreate.textContent = "Crear";
    nameInput.setAttribute("placeholder", "Titulo");
    descriptionInput.setAttribute("placeholder", "Enlace a la imagen");
  
    nameInput.value = "";
    descriptionInput.value = "";
  
  // This is to remove event listener that was added in handleEditButton
    saveButton.removeEventListener("click", saveProfileDetails) 
    saveButton.addEventListener("click", addCard)

} 

// function that obtains data and replaces it
// corrected from feedback1
function addCard() {
    const newCard = {
        name: nameInput.value,
        link: descriptionInput.value,
        alt: newCard.name
    }

    const card = getCardElement(newCard);
    cardContainer.prepend(card);

    closePopup();
}


// prevents popup from showing when reloading website.
document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".page");
  page.classList.remove("preload");
})

renderInitialCards();
  
