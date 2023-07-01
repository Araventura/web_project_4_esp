//export form for FormValidator
//establece la configuracion para validar los campos. Este es un constructor
//dos parametros 1) objeto que almacena a los selectores
//2)toma un elemnto del formulario a validad

export class FormValidator {
  _formClasses = null;
  _formElement = null;

  constructor(formClasses, formElement) {
    this._formClasses = formClasses;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    this._setupValidationEventListeners(); //pasa el valor de propiedad data.popup a setupValidation..
  }

  _setupValidationEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._formClasses.popupInputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
      this.toggleFormButton(); // this function toggles button, prevents false entries
    } else {
      this._hideInputError(inputElement);
      this.toggleFormButton(); //function that toggles button
    }
  }

  _showInputError(inputElement) {
    const inputWrapper = this._formElement.querySelector(
      `#${inputElement.id}-wrapper`
    );
    const errorElement = inputWrapper.querySelector(
      `.popup__${inputElement.id}-error-message`
    );
    inputElement.classList.add("popup__input_error_invalid");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add("popup__error-message_type_active");
  }

  _hideInputError(inputElement) {
    const inputWrapper = this._formElement.querySelector(
      `#${inputElement.id}-wrapper`
    );
    const errorElement = inputWrapper.querySelector(
      `.popup__${inputElement.id}-error-message`
    );
    errorElement.classList.remove("popup__error-message_type_active");
    errorElement.classList.add("popup__error-message_type_inactive");
    inputElement.classList.remove("popup__input_error_invalid");
  }

  toggleFormButton() {
    const popupInputs = Array.from(
      this._formElement.querySelectorAll(".popup__input-wrapper .popup__input")
    );
    if (!popupInputs[0].validity.valid || !popupInputs[1].validity.valid) {
      const formButton = this._formElement.querySelector(".popup__button");
      formButton.setAttribute("disabled", true);
      formButton.classList.add("popup__button-inactive");
    } else {
      const formButton = this._formElement.querySelector(".popup__button");
      formButton.removeAttribute("disabled");
      formButton.classList.remove("popup__button-inactive");
    }
  }

  resetInputValidation(popup) {
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
  }
}
