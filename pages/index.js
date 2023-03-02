let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__button-edit");
let saveButton = document.querySelector(".popup__button");
let exitButton = document.querySelector(".popup__close-button");
let likeButtons = document.querySelectorAll(".card__like");

likeButtons.forEach(button => button.addEventListener("click", clickLike));

saveButton.addEventListener("click", savePopup)

function savePopup() {
    let profileName = document.querySelector(".profile__name");
    let profileInfo = document.querySelector(".profile__description");
    let nameInput = document.querySelector("#input-name");
    let descriptionInput = document.querySelector("#input-description");


    profileName.textContent = nameInput.value;
    profileInfo.textContent = descriptionInput.value;

    buttonExit();
}

exitButton.addEventListener("click", buttonExit)

function buttonExit() {
    popup.classList.remove("popup_open")
}

editButton.addEventListener("click", openPopup)

function openPopup() {
    popup.classList.add("popup_open")
    let profileName = document.querySelector(".profile__name");
    let profileInfo = document.querySelector(".profile__description");
    let nameInput = document.querySelector("#input-name");
    let descriptionInput = document.querySelector("#input-description");

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileInfo.textContent;
}

function clickLike(e) {
    e.target.setAttribute("src", "./images/blackheart.png");
}