import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/* -------------------------------------------------------------------------- */
/*                             DOM References                                 */
/* -------------------------------------------------------------------------- */
const domElements = {
  avatarImage: document.querySelector(".profile__image"),
  avatarEditButton: document.querySelector(".profile__image-edit-button"),
  nameInput: document.querySelector("#profile-name"),
  jobInput: document.querySelector("#profile-description"),
  profileEditButton: document.querySelector("#profile-edit-button"),
  avatarForm: document.querySelector("#edit-avatar-form"),
  avatarSubmitButton: document.querySelector("#avatar-submit-button"),
  addCardSubmitButton: document.querySelector("#add-card-submit-button"),
  profileEditSubmitButton: document.querySelector("#profile-edit-submit-button"),
  addButton: document.querySelector("#add-button"),
};

console.log("Avatar Image Element:", domElements.avatarImage);

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

/* -------------------------------------------------------------------------- */
/*                              API and User Info                             */
/* -------------------------------------------------------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "19ef03f7-30e6-4001-8bf7-8913888ed1f1",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

function loadUserProfile() {
  api
    .getUserInfo()
    .then((userData) => {
      console.log("User Data:", userData);
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      window.userId = userData._id;
    })
    .catch((error) => {
      console.error("Error loading user profile:", error);
    });
}

loadUserProfile();

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

function loadInitialCards() {
  api
    .getInitialCards()
    .then((cards) => {
      console.log("Fetched cards:", cards);
      cardSection.renderItems(cards);
    })
    .catch((error) => {
      console.error("Error loading initial cards:", error);
    });
}
loadInitialCards();

function createCard(cardData) {
  return new Card(
    {
      name: cardData.name,
      link: cardData.link,
      id: cardData._id,
      isLiked: cardData.isLiked,
    },
    "#card-template",
    handleImageClick,
    (cardInstance) => handleDeleteCard(cardInstance),
    handleLikeIcon
  ).generateCard();
}

/* -------------------------------------------------------------------------- */
/*                               Popup Instances                              */
/* -------------------------------------------------------------------------- */
const imagePopup = new PopupWithImage("#preview-card-modal");
imagePopup.setEventListeners();

const profileFormPopup = new PopupWithForm("#edit-profile-modal", handleProfileFormSubmit);
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
addCardFormPopup.setEventListeners();

const deleteConfirm = new PopupWithConfirm("#delete-card-modal");
deleteConfirm.setEventListeners();

const avatarPopup = new PopupWithForm("#edit-avatar-modal", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleProfileFormSubmit(inputValues) {
  function makeRequest() {
    return api.updateUserInfo({
      name: inputValues.name,
      job: inputValues.description,
    }).then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
    });
  }
  handleSubmit(makeRequest, profileFormPopup);
}

const cardForm = document.querySelector("#add-card-form");
function handleAddCardFormSubmit(inputValues) {
  function makeRequest() {
    const cardData = { title: inputValues.title, url: inputValues.url };
    return api.addCard(cardData).then((savedCardData) => {
      const card = createCard({
        name: savedCardData.name,
        link: savedCardData.link,
        _id: savedCardData._id,
      });
      cardSection.addItem(card);
      cardForm.reset();
    });
  }
  handleSubmit(makeRequest, addCardFormPopup, "Creating...");
}

function handleDeleteCard(card) {
  deleteConfirm.setSubmitFunction(() => {
    api.deleteCard(card._id)
      .then(() => {
        console.log(`Card ${card._id} deleted successfully`);
        card.handleDeleteCard();
        deleteConfirm.close();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  });
  deleteConfirm.open();
}

const avatarForm = document.querySelector("#edit-avatar-form");
function handleAvatarFormSubmit(inputValues) {
  function makeRequest() {
    return api.updateUserAvatar(inputValues.avatarUrl).then((userData) => {
      userInfo.setUserInfo({ avatar: userData.avatar });
      avatarForm.reset();
    });
  }
  handleSubmit(makeRequest, avatarPopup);
}

function handleLikeIcon(card) {
  const apiCall = card.isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);

  apiCall
    .then(() => {
      card.isLiked = !card.isLiked;
    })
    .catch((err) => {
      console.error(`Error toggling like for card ID ${card._id}:`, err);
    });
}
/* -------------------------------------------------------------------------- */
/*                            Set Button Listeners                            */
/* -------------------------------------------------------------------------- */
domElements.profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  domElements.nameInput.value = userData.name;
  domElements.jobInput.value = userData.job;
  profileFormPopup.open();
});

domElements.addButton.addEventListener("click", () => addCardFormPopup.open());
domElements.avatarEditButton.addEventListener("click", () => avatarPopup.open());

/* -------------------------------------------------------------------------- */
/*                            Utility Functions                               */
/* -------------------------------------------------------------------------- */
