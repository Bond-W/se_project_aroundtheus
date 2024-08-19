export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardEl = this._getTemplate();
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

  _handleImageClick() {

  }

  _handleOverlayClick(event) {
    if (event.target.classList.contains("modal")) {
      this.closeModal(event.target);
    }
  }

  _handleEscKeyPress(event) {
    if(event.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      if (openedModal) {
        this.closeModal(openedModal);
      }
    }
  }

  openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscKeyPress);
  }

  closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscKeyPress);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set event listeners
    this._setEventListeners();
    return cardElement;
    // return the card
  }

  generateCard() {
    this._cardEl = this._getTemplate();

    this._cardEl.querySelector('.card__name').textContent = this._name;
    this._cardImageElement = this._cardEl.querySelector('.card__image');
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    return this._cardEl;
  }

  renderInitialCards(initialCards, wrapper, cardSelector, handleImageClick) {
    initialCards.forEach((cardData) => {
      const card = new Card(cardData, cardSelector,handleImageClick);
      const cardElement = card.generateCard();
      wrapper.prepend(cardElement);
    });
  }

  handleAddCardFormSubmit(event, wrapper, cardSelector, handleImageClick, modal) {
    event.preventDefault();
    const name = event.target.querySelector("#card-name").value;
    const link = event.target.querySelector("#card-image").value;

    const card = new Card({ name, link }, cardSelector, handleImageClick);
    const cardElement = card.generateCard();
    wrapper.prepend(cardElement);

    this.closeModal(modal);
    event.target.reset();
  }

  handleProfileFormSUbmit(event, nameInput, jobInput, profileName, profileDescription, modal) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    this.closeModal(modal);
}

}
