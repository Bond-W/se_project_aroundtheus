import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.modal__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.modal__input'));
        this._handleFormSubmit = handleFormSubmit;


    }
    
    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }
    
    close() {
        super.close();
        this._popupForm.reset();
    }
}