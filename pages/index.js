const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__button-edit");
const saveButton = document.querySelector(".popup__button");
const exitButton = document.querySelector(".popup__close-button");
const likeButtons = document.querySelectorAll(".card__like");
const addButton = document.querySelector(".profile__button-add");


//Like button
likeButtons.forEach(button => button.addEventListener("click", clickLike));

function clickLike(e) {
    e.target.classList.toggle("card__like_active");

}

//Save Popup



function savePopup() {
    const profileName = document.querySelector(".profile__name");
    const profileInfo = document.querySelector(".profile__description");
    const nameInput = document.querySelector("#input-name");
    const descriptionInput = document.querySelector("#input-description");


    profileName.textContent = nameInput.value;
    profileInfo.textContent = descriptionInput.value;

    buttonExit();
}

exitButton.addEventListener("click", buttonExit)

function buttonExit() {
    popup.classList.remove("popup_open")
}

//OPEN popup
editButton.addEventListener("click", openPopup)

function openPopup() {
    popup.classList.add("popup_open")
    const profileName = document.querySelector(".profile__name");
    const profileInfo = document.querySelector(".profile__description");
    const nameInput = document.querySelector("#input-name");
    const descriptionInput = document.querySelector("#input-description");

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileInfo.textContent;

    saveButton.addEventListener("click", savePopup)
}

//add photo button
addButton.addEventListener("click", openAddPopup)

function openAddPopup() {
    popup.classList.add("popup_open");

    const popupTitle = document.querySelector(".popup__title");
    const popupCreate = document.querySelector(".popup__button");
    const nameInput = document.querySelector("#input-name");
    const descriptionInput = document.querySelector("#input-description");

    popupTitle.textContent = "Nuevo Lugar";
    popupCreate.textContent = "Crear";
    nameInput.setAttribute("placeholder", "Titulo");
    descriptionInput.setAttribute("placeholder", "Enlace a la imagen");

} 

const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
      alt: "A photo of Yosemite close to water"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
      alt: "Photo of lake Louise with snow mountains"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
      alt: "Calvas mountains with a sunset"
    },
    {
      name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
      alt: "Latemar with a night sky"
    },
    {
      name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
      alt: "Vanoise during the day with clear sky"
    },
    {
      name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
      alt: "Lake di Braies with two red canopies"
    }
];
  
//crear una clase function Person (name, age, email) {
    //this.name = name;
    //this.age = age
    //}
//const ara = new Person ("ara", 30)