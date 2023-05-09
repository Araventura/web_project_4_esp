//Function that adds event listener when submit is clicked and will prevent automatic refresh
export const enableValidation = (data) => {
  //formValidator
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    setupValidationEventListeners(formElement, data.popupInputSelector);
  });
};

//this function will start validation
const setupValidationEventListeners = (formElement, popupInputSelector) => {
  const inputList = Array.from(
    formElement.querySelectorAll(popupInputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, formElement);
    });
  });
};

const checkInputValidity = (inputElement, formElement) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, formElement);
    toggleFormButton(formElement); // this function toggles button, prevents false entries
  } else {
    hideInputError(inputElement, formElement);
    toggleFormButton(formElement); //function that toggles button
  }
};

const showInputError = (inputElement, formElement) => {
  const inputWrapper = formElement.querySelector(`#${inputElement.id}-wrapper`);
  const errorElement = inputWrapper.querySelector(
    `.popup__${inputElement.id}-error-message`
  );
  inputElement.classList.add("popup__input_error_invalid");
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add("popup__error-message_type_active");
};

export const toggleFormButton = (formElement) => {
  const popupInputs = Array.from(
    formElement.querySelectorAll(".popup__input-wrapper .popup__input")
  );
  if (!popupInputs[0].validity.valid || !popupInputs[1].validity.valid) {
    const formButton = formElement.querySelector(".popup__button");
    formButton.setAttribute("disabled", true);
    formButton.classList.add("popup__button-inactive");
  } else {
    const formButton = formElement.querySelector(".popup__button");
    formButton.removeAttribute("disabled");
    formButton.classList.remove("popup__button-inactive");
  }
};

const hideInputError = (inputElement, formElement) => {
  const inputWrapper = formElement.querySelector(`#${inputElement.id}-wrapper`);
  const errorElement = inputWrapper.querySelector(
    `.popup__${inputElement.id}-error-message`
  );
  errorElement.classList.remove("popup__error-message_type_active");
  errorElement.classList.add("popup__error-message_type_inactive");
  inputElement.classList.remove("popup__input_error_invalid");
};

export const resetInputValidation = (popup) => {
  const inputList = Array.from(
    popup.querySelectorAll(
      ".popup .popup__container .form .popup__input-wrapper .popup__input"
    )
  );
  const errorMessages = Array.from(
    popup.querySelectorAll(
      ".popup .popup__container .form .popup__input-wrapper span"
    )
  );
  errorMessages.forEach((message) => {
    message.classList.remove("popup__error-message_type_active");
    message.classList.add("popup__error-message_type_inactive");
    message.textContent = "";
  });

  inputList.forEach((input) => {
    input.classList.remove("popup__input_error_invalid");
  });
};
