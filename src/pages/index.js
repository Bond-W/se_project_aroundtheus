import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

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

const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-description");
const profileEditButton = document.querySelector("#profile-edit-button");
/* -------------------------------------------------------------------------- */
/*                               Popup Instances                              */
/* -------------------------------------------------------------------------- */
let imagePopup;


  const previewCardModal = document.querySelector("#preview-card-modal");

  if (!previewCardModal) {
    console.error("Element with ID #preview-card-modal not found in the DOM");
  } else {
    imagePopup = new PopupWithImage("#preview-card-modal");
    imagePopup.setEventListeners();
  }

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



function handleProfileFormSubmit(formData) {
  api.updateUserInfo({
    name: formData.name,
    job: formData.description,
  })
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
  })
  .catch((err) => {
    console.error("Error updating profile", err);
  });
}

function handleAddCardFormSubmit(formData) {
  const cardData = { name: formData.title, link: formData.url };
  cardSection.addItem(createCard(cardData));
}

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
  return new Card(cardData, "#card-template", handleImageClick, openDeleteConfirmationModal).generateCard();
}

function handleImageClick(name, link) {
    imagePopup.open(name, link);
}

const avatarEditButton = document.querySelector('.profile__image-edit-button');
const editAvatarModal = document.querySelector('#edit-avatar-modal');

function openAvatarModal() {
  editAvatarModal.classList.add('modal_opened');
}

function closeAvatarModal() {
  editAvatarModal.classList.remove('modal_opened');
}

avatarEditButton.addEventListener('click', openAvatarModal);

document.querySelector('#avatar-edit-modal-close-button').addEventListener('click', closeAvatarModal);

document.querySelector('#edit-avatar-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const avatarUrlInput = document.querySelector('#avatar-url').value;

  document.querySelector('.profile__image').src = avatarUrlInput;

  closeAvatarModal();
});


const deleteCardModal = document.querySelector('#delete-card-modal');
const modalCloseDeleteButton = document.querySelector('#modal-close-delete-button');
const confirmDeleteButton = deleteCardModal.querySelector('#modal-delete-button');
const deleteButtons = document.querySelectorAll('.card__delete-button');

let cardToDelete = null;

function openDeleteConfirmationModal(card) { 
  console.log("Opening delete modal for card:", card);
  cardToDelete = card;
  deleteCardModal.classList.add("modal_opened");
}

function confirmDelete() {
  console.log("Deleting card instance:", cardToDelete);

  if (cardToDelete && typeof cardToDelete.handleDeleteCard === "function") {
      cardToDelete.handleDeleteCard();
      cardToDelete = null;
  } else {
      console.error("handleDeleteCard is not a function on", cardToDelete);
  }

  deleteCardModal.classList.remove("modal_opened");
}

confirmDeleteButton.addEventListener("click", confirmDelete);
modalCloseDeleteButton.addEventListener("click", () => {
  deleteCardModal.classList.remove("modal_opened");
});

const profileForm = document.querySelector('#edit-profile-form');
const submitButton = profileForm.querySelector('.modal__button');

function saveProfileFormSubmit(formData) {
  submitButton.textContent = 'Saving...';

  Api.updateUserInfo(formData)
    .then(() => {
      console.log('Profile updated successfully');
      submitButton.textContent = 'Save';
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
      submitButton.textContent = 'Save';
    });
}

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    name: document.querySelector('#profile-name').value,
    description: document.querySelector('#profile-description').value,
  };

  saveProfileFormSubmit(formData);
});


const avatarImage = document.querySelector('.profile__image');
const avatarForm = document.querySelector('#edit-avatar-form');
const avatarSubmitButton = avatarForm.querySelector('.modal__button');

function handleAvatarFormSubmit(formData) {
  avatarSubmitButton.textContent = 'Saving...';

  api.updateUserAvatar(formData.avatarUrl)
  .then((userData) => {
    console.log("Updated user data received:", userData);
    if(avatarImage) {
      avatarImage.src = userData.avatar;
    } else {
      console.error("avatarImage element not found in the DOM");
    }
    avatarSubmitButton.textContent = 'Save';  
  })
  .catch((error) => {
    console.error('Error updating avatar:', error);
    avatarSubmitButton.textContent = 'Save';
  });
}

avatarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = {
    avatarUrl: document.querySelector('#avatar-url').value,
  };
  handleAvatarFormSubmit(formData);
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
      authorization: "19ef03f7-30e6-4001-8bf7-8913888ed1f1",
      "Content-Type": "application/json",
  },
});

function loadUserProfile() {
  api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    avatarImage.src = userData.avatar;
  })
  .catch((error) => {
    console.error("Error loading user profile:", error);
  });
}

function loadInitialCards() {
  api.getInitialCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
    });
  })
  .catch((error) => {
    console.error("Error loading initial cards:", error);
  });
}

loadUserProfile();
loadInitialCards();

deleteCardModal.setEventListeners();
editAvatarModal.setEventListeners();
