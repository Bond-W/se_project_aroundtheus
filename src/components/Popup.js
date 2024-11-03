export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

//   _openDeleteConfirmationModal(cardElement, deleteCardHandler) {
//     deleteCardModal.classList.add('modal_opened');
  
//     confirmDeleteButton.onclick = function (event) {
//       event.preventDefault();
//       deleteCardHandler(cardElement);
//       modalCloseConfirmationModal();
//     };
//   }
  
//  _closeDeleteConfirmationModal() {
//     deleteCardModal.classList.remove('modal_opened');
//   }
  
  // modalCloseDeleteButton.addEventListener('click', closeDeleteConfirmationModal);
  

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}
