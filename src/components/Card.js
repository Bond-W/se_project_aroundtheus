// import { openDeleteConfirmationModal } from './PopupWithForm'

export default class Card {
  constructor({ name, link, id, isLiked }, cardSelector, handleImageClick, handleDeleteCard, handleLikeIcon) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._isLiked = isLiked;
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
  
  renderCardLike() {
    if(this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    this.renderCardLike();
  }

  generateCard() {
    this._cardEl = this._getTemplate();
    this._cardEl.setAttribute('data-id', this._id);
    this._cardEl.querySelector(".card__name").textContent = this._name;
    this._cardImageElement = this._cardEl.querySelector(".card__image");
    this._likeButton = this._cardEl.querySelector(".card__like-button");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    
    this._setEventListeners();
    this.renderCardLike();
    return this._cardEl;
  }
  

  toggleLikeIcon() {
    this._cardEl.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }

}
