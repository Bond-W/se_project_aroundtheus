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
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description,
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
  return new Card(cardData, "#card-template", handleImageClick).generateCard();
}

function handleImageClick(name, link) {
    imagePopup.open(name, link);
}



