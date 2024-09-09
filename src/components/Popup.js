export default class Popup {
    constructor({ popupSelector }) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handelEscClose.bind(this);
    }
    
    open() {
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    close() {
        this._popupElement.classLIst.remove('modal_opened');
        document.removeEventListener('keydown', this._handelEscClose);
    }
    
    _handelEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    
    setEventListeners() {
        this._popupElement.querySelector('.modal__close').addEventListener('click', () => {
            this.close();
        });

        this._popupElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal')) {
                this.close();
            }
        });
    }




}