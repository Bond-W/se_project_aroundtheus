import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import Section from "../components/Section.js";

/* -------------------------------------------------------------------------- */
/*                           Enable Form Validation                           */
/* -------------------------------------------------------------------------- */

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

const cardsWrap = document.querySelector(".cards__list");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-description");
const profileEditButton = document.querySelector("#profile-edit-button");
/* -------------------------------------------------------------------------- */
/*                               Popup Instances                              */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
const imagePopup = new PopupWithImage("#preview-card-modal");
imagePopup.setEventListeners();

const profileFormPopup = new PopupWithForm(
  "#edit-profile-modal",
  handleProfileFormSubmit
);
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardFormPopup.setEventListeners();
/* -------------------------------------------------------------------------- */
/*                              User Information                              */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  profileFormPopup.open();
});

document.querySelector("#add-button").addEventListener("click", () => {
  addCardFormPopup.open();
});



});
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description,
  });
}

function handleAddCardFormSubmit(formData) {
  renderCard({ name: formData.title, link: formData.url }, cardsWrap);
}

/* -------------------------------------------------------------------------- */
/*                              DOM Elements                                  */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                              Modal Handling                                */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                               Card Rendering                               */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardEl = createCard(cardData);
      cardSection.addItem(cardEl);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

// function renderCard(cardData, wrapper) {
//   const cardEl = createCard(cardData);
//   wrapper.prepend(cardEl);
// }

// initialCards.forEach((cardData) => {
//   renderCard(cardData, cardsWrap);
// });

// const editProfileModal = document.querySelector("#edit-profile-modal");
// const profileModalCloseButton = editProfileModal.querySelector(
//   "#profile-edit-modal-close-button"
// );
// const profileEditForm = document.forms["edit-profile-form"];
// const profileName = document.querySelector(".profile__name");
// const profileDescription = document.querySelector(".profile__description");

// const addCardModal = document.querySelector("#add-card-modal");
// const addCardForm = document.forms["add-card-form"];
// const addNewCardButton = document.querySelector("#add-button");
// const addCardModalCloseButton = addCardModal.querySelector(
//   "#add-modal-close-button"
// );

// const cardNameInput = document.querySelector("#card-name");
// const cardUrlInput = document.querySelector("#card-image");

// const modalPreview = document.querySelector("#preview-card-modal");
// const previewCloseButton = modalPreview.querySelector(
//   "#modal-close-preview-button"
// );

/* -------------------------------------------------------------------------- */
/*                            Image Preview Handler                           */
/* -------------------------------------------------------------------------- */

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscKeyPress);
//   modal.addEventListener("click", handleOverlayClick);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscKeyPress);
//   modal.removeEventListener("click", handleOverlayClick);
// }

// function handleEscKeyPress(event) {
//   if (event.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     if (openedModal) closeModal(openedModal);
//   }
// }

// function handleOverlayClick(e) {
//   if (e.target.classList.contains("modal")) {
//     closeModal(e.target);
//   }
// }

// function handleProfileFormSubmit(e) {
//   e.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
//   closeModal(editProfileModal);

//   formValidators[profileEditForm.getAttribute("name")].disableSubmitButton();
// }

// function handleAddCardFormSubmit(e) {
//   e.preventDefault();
//   const name = cardNameInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardsWrap);
//   closeModal(addCardModal);
//   e.target.reset();

//   formValidators[addCardForm.getAttribute("name")].disableSubmitButton();
// }

// /* -------------------------------------------------------------------------- */
// /*                               Event Listeners                              */
// /* -------------------------------------------------------------------------- */

// profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// profileEditButton.addEventListener("click", () => {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileDescription.textContent;
//   openModal(editProfileModal);
// });

// addNewCardButton.addEventListener("click", () => {
//   openModal(addCardModal);
// });

// profileModalCloseButton.addEventListener("click", () => {
//   closeModal(editProfileModal);
// });

// addCardModalCloseButton.addEventListener("click", () => {
//   closeModal(addCardModal);
// });

// previewCloseButton.addEventListener("click", () => {
//   closeModal(modalPreview);
// });
