// import { openDeleteConfirmationModal } from './PopupWithForm'

export default class Card {
  constructor({ name, link, id }, cardSelector, handleImageClick, handleDeleteCard) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
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
    this._cardEl.querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());
  
    this._cardEl.querySelector(".card__delete-button")
      .addEventListener("click", () => {
        console.log("Delete button clicked for card ID:", this._id);
        this._handleDeleteCard(this);
      });
    

      this._cardImageElement.addEventListener("click", () => {
        if (this._handleImageClick) {
          this._handleImageClick(this._name, this._link);
        }
      });
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
  
  _handleLikeIcon() {
    this._cardEl
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
}
