export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }
  
  _hideInputError() {

  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hasInvalidInput() {

  }

  _checkInputValidity() {

  }


  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }


  _setEventListeners() {
    this._inputEls = Array.from(this.form.querySelectorAll(inputSelector));
    this._submitButton = this.form.querySelector(submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this.form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  }
}
