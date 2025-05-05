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

  get isLiked() {
    return this._isLiked;
  }

  set isLiked(value) {
    this._isLiked = value;
    this._updateLikeIcon();
  }

  _updateLikeIcon() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  toggleLike() {
    this._isLiked = !this._isLiked;
    this._updateLikeIcon();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const deleteButton = this._cardEl.querySelector(".card__delete-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this);
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  generateCard() {
    this._cardEl = this._getTemplate();
    this._likeButton = this._cardEl.querySelector(".card__like-button");
    this._cardImageElement = this._cardEl.querySelector(".card__image");
    this._cardEl.querySelector(".card__name").textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._updateLikeIcon();
    this._setEventListeners();

    return this._cardEl;
  }
}