//Function that adds event listener when submit is clicked and will prevent automatic refresh
export const enableValidation = (data) => {
    const formList = Array.from(document.querySelectorAll(data.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (e) {
            e.preventDefault();
        })
        setupValidationEventListeners(formElement, data.popupInputSelector);
    })
};

//this function will start validation 
const setupValidationEventListeners = (formElement, popupInputSelector) => {
    const inputList = Array.from(document.querySelectorAll(popupInputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(inputElement, formElement);
        })
    })
}

const checkInputValidity = (inputElement, formElement) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, formElement)
    } else {
        hideInputError(inputElement, formElement);
    }
}

const showInputError = (inputElement, formElement) => {
    const inputWrapper = formElement.querySelector(`#${inputElement.id}-wrapper`);
    const errorElement = inputWrapper.querySelector(`.${inputElement.id}__error-message`);
    inputElement.classList.add("popup__input_error_invalid");

    errorElement.textContent = inputElement.errorMessage;
    errorElement.classList.add("popup__error-message_type_active");
    
    //aqui agregar para hacer el boton inactivo
}

const hideInputError = (inputElement, formElement) => {
    console.log(inputElement.id);
    const inputWrapper = formElement.querySelector(`#${inputElement.id}-wrapper`);
    console.log("yiyo", formElement)
    const errorElement = inputWrapper?.querySelector(`.${inputElement.id}__error-message`);
    errorElement?.classList.remove("popup__error-message_type_active");
    inputElement.classList.remove("popup__input_error_invalid");
}

