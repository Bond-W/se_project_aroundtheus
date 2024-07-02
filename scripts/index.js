const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/* -------------------------------------------------------------------------- */
/*                                  Wrappers                                  */
/* -------------------------------------------------------------------------- */

const cardsWrap = document.querySelector(".cards__list");

/* -------------------------------------------------------------------------- */
/*                        Buttons and other DOM Nodes                         */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseButton = editProfileModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileEditForm = document.forms["edit-profile-form"];
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");

/* -------------------------------------------------------------------------- */
/*                                  Add card                                  */
/* -------------------------------------------------------------------------- */

const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const addNewCardButton = document.querySelector("#add-button");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-modal-close-button"
);

const cardNameInput = document.querySelector("#card-name-input");
const cardUrlInput = document.querySelector("#card-image-input");

const cardTitleInput = addCardForm.querySelector("#card-name-input");
const urlInput = addCardForm.querySelector("#card-image-input");

/* -------------------------------------------------------------------------- */
/*                                   part 2                                   */
/* -------------------------------------------------------------------------- */

const modalPreview = document.querySelector("#preview-card-modal");
const previewCloseButton = modalPreview.querySelector(
  "#modal-close-preview-button"
);

/* -------------------------------------------------------------------------- */
/*                                  Form Data                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardEl = cardTemplate.cloneNode(true);
  const cardImageEl = cardEl.querySelector(".card__image");
  const cardNameEl = cardEl.querySelector(".card__name");
  const likeButton = cardEl.querySelector(".card__like-button");
  const deleteButton = cardEl.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardEl.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openImagePreview(cardData.link, cardData.name);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardNameEl.textContent = cardData.name;

  return cardEl;
}

function openImagePreview(imageSrc, imageAlt) {
  const modalImagePreview = document.querySelector(".modal__preview-image");
  const modalCaption = document.querySelector(".modal__preview-caption");

  modalImagePreview.src = imageSrc;
  modalImagePreview.alt = imageAlt;
  modalCaption.textContent = imageAlt;

  openModal(modalPreview);
}

previewCloseButton.addEventListener("click", () => {
  closeModal(modalPreview);
});

function renderCard(cardData, wrapper) {
  const cardEl = getCardElement(cardData);
  wrapper.prepend(cardEl);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  e.target.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsWrap);
});
