import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._handleFormSubmit = handleFormSubmit;
   
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log("Captured form values:", formValues);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = this._getInputValues();
        console.log("Form Data on Submit:", formData);
        this._handleFormSubmit(formData);
        this._popupForm.reset();
    });
}

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}
