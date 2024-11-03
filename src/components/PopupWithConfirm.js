import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._submitFunction = null;
        this._submitButton = this._popupElement.querySelector('.modal__button');
    }
    setSubmitFunction(submitFunction){
        this._submitFunction = submitFunction;
    }

    setEventListeners(){
        super.setEventListeners();
        this._submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (this._submitFunction) {
                this._submitFunction();
            }
            this.close();
        });
    }
}