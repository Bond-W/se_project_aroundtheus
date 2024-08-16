export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // ".card__like-button"
    this._cardEl
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".card__delete-button"
    this._cardEl
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

      this._cardImageElement.addEventListener('click', () => {
        this._handleImageClick(this);
      });
  }

  _handleDeleteCard() {
    this._cardEl.remove();
    this._cardEl = null;
  }

  _handleLikeIcon() {
    this._cardEl
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set event listeners
    this._setEventListeners();
    // return the card
  }
}
