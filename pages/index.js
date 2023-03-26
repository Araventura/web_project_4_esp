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

function renderInitialCards() {
    initialCards.forEach((dataCard) => {
        renderCard(dataCard, cardContainer)
    })
}

function renderCard(data, cardContainer) {
    cardContainer.prepend(getCardElement(data))
}

// Create card element
function getCardElement(data) {
    const cardTemplateContent = cardTemplate.content.querySelector(".card__item");
    const cardElement = cardTemplateContent.cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    const cardButton = cardElement.querySelector(".card__like");
    const cardTrash = cardElement.querySelector(".card__trash");

    cardTitle.textContent = data.name;
    cardImage.src = data.link;
    cardImage.addEventListener("click", showImage);
    cardImage.alt = data.alt;
    cardButton.addEventListener("click", clickLike);
    cardTrash.addEventListener("click", deleteCard);

    return cardElement;
}

// Function that opens image and centers it

function showImage(e) {
    cover.classList.add("cover_clicked")
    cover.querySelector(".cover__image").src = e.target.src;
    cover.querySelector(".cover__subtitle").textContent = e.target.alt;
    coverExitButton.addEventListener("click", coverExit);

}

function coverExit() {
    cover.classList.remove("cover_clicked");
}

//Function to aid with transition

// function popupFade() {
//     setTimeout(() => {
//         console.log("Hola")
//         popup.classList.add("popup_hide")
//         cover.classList.remove("cover_clicked")
//     }, 1000);
    
// }

//Like button

function clickLike(e) {
    e.target.classList.toggle("card__like_active");
}

//Trash button

function deleteCard(e) {
    console.log(e.target);
    e.target.closest(".card__item").remove();
}

//Save Popup - 

function savePopup() {

    profileName.textContent = nameInput.value;
    profileInfo.textContent = descriptionInput.value;

    buttonExit();

}

exitButton.addEventListener("click", buttonExit)

function buttonExit() {
    popup.classList.remove("popup_open");

}

function handleEditButton() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileInfo.textContent;
    popupTitle.textContent = "Editar Perfil";
    saveButton.textContent = "Guardar";

    saveButton.removeEventListener("click", addCard)
    saveButton.addEventListener("click", savePopup)
    openPopup(popup);
}


//OPEN edit popup
editButton.addEventListener("click", handleEditButton)

function openPopup(popupElement) {
    popupElement.classList.add("popup_open");
}

//add photo button
addButton.addEventListener("click", openAddPopup)

function openAddPopup() {
    popup.classList.remove("popup_hide");
    popup.classList.add("popup_open");
    const popupCreate = document.querySelector(".popup__button");
    const nameInput = document.querySelector("#input-name");
    const descriptionInput = document.querySelector("#input-description");

    popupTitle.textContent = "Nuevo Lugar";
    popupCreate.textContent = "Crear";
    nameInput.setAttribute("placeholder", "Titulo");
    descriptionInput.setAttribute("placeholder", "Enlace a la imagen");
    nameInput.value = "";
    descriptionInput.value = "";

    saveButton.removeEventListener("click", savePopup)
    saveButton.addEventListener("click", addCard)

} 

function addCard() {
    const newCard = {
        name: "",
        link: "",
        alt: ""
    }

    newCard.name = nameInput.value;
    newCard.link = descriptionInput.value;
    newCard.alt = newCard.name;

    const card = getCardElement(newCard);
    cardContainer.prepend(card);

    buttonExit();
}

setTimeout(() => {
    const page = document.querySelector(".page");
    page.classList.remove("preload")
})

renderInitialCards();
  
