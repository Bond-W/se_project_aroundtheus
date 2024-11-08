// import { openDeleteConfirmationModal } from './PopupWithForm'

export default class Card {
  constructor({ name, link, id }, cardSelector, handleImageClick, handleDeleteCard, handleLikeIcon) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
  }

  handleDeleteCard() {
    if (this._cardEl) {
      this._cardEl.remove();
      this._cardEl = null;
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const likeButton = this._cardEl.querySelector(".card__like-button");
    const deleteButton = this._cardEl.querySelector(".card__delete-button");

    if (likeButton) {
      likeButton.addEventListener("click", () => {
        this._handleLikeIcon(this);
      });
    }
  
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    }

    if (this._cardImageElement) {
      this._cardImageElement.addEventListener("click", () => {
        if (this._handleImageClick) {
          this._handleImageClick(this._name, this._link);
        }
      });
    }
  }
  
  generateCard() {
    this._cardEl = this._getTemplate();
    this._cardEl.querySelector(".card__name").textContent = this._name;
    this._cardImageElement = this._cardEl.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    
    this._setEventListeners();
    return this._cardEl;
  }
  

  toggleLikeIcon() {
    this._cardEl.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }

//   _handleLikeIcon() {
//     this._cardEl
//       .querySelector(".card__like-button")
//       .classList.toggle("card__like-button_active");
//   }
}
