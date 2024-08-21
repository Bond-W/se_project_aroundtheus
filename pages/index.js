import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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


const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input-type-error",
  errorClass: "modal__error_visible",
};

const formValidators = {};

function enableValidation(config) {
  const formElements = document.querySelectorAll(config.formSelector);
  formElements.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(settings);

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
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-description");

/* -------------------------------------------------------------------------- */
/*                                  Add card                                  */
/* -------------------------------------------------------------------------- */

const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const addNewCardButton = document.querySelector("#add-button");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-modal-close-button"
);

const cardNameInput = document.querySelector("#card-name");
const cardUrlInput = document.querySelector("#card-image");

const modalPreview = document.querySelector("#preview-card-modal");
const previewCloseButton = modalPreview.querySelector(
  "#modal-close-preview-button"
);

/* -------------------------------------------------------------------------- */
/*                                  Form Data                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyPress);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyPress);
  modal.removeEventListener("click", handleOverlayClick);
}

function handleEscKeyPress(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

function handleOverlayClick(e) {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
}

function handleImageClick(name, link) {
  const modalImagePreview = document.querySelector(".modal__preview-image");
  const modalCaption = document.querySelector(".modal__preview-caption");

  modalImagePreview.src = link;
  modalImagePreview.alt = name;
  modalCaption.textContent = name;

  openModal(modalPreview);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

function renderCard(cardData, wrapper) {
  const cardEl = createCard(cardData);
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

profileModalCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(modalPreview);
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", handleOverlayClick);
});

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsWrap);
});
