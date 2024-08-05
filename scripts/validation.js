// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(`showing error for ${inputEl.id}`);
  if (errorMessageEl) {
    inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
} else {
    console.error(`Error element not found for ${inputEl.id}`);
}
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(`Hiding error for ${inputEl.id}`);
  if (errorMessageEl) {
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
  } else {
    console.error(`Error element not found for ${inputEl.id}`);
  }
}

function checkInputValidity(formEl, inputEl, options) {
    console.log(`Checking validity for ${inputEl.id}`);
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }

  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    console.log('Checking button state');
  if (hasInvalidInput(inputEls)) {
    console.log('Disabling button');
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
  console.log('Enabling button')
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
        console.log(`Input event on ${inputEl.id}`);
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input-type-error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
