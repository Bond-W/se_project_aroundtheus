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
/*                           Enable Form Validation                           */
/* -------------------------------------------------------------------------- */
const avatarImage = document.querySelector(".profile__image");
console.log("Avatae Image Element:", avatarImage);
const avatarEditButton = document.querySelector(".profile__image-edit-button");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-description");
const profileEditButton = document.querySelector("#profile-edit-button");
const avatarForm = document.querySelector("#edit-avatar-form");
const avatarSubmitButton = avatarForm.querySelector(".modal__button");

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
/*                              API and User INFO                             */
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
});

function loadUserProfile() {
  api
    .getUserInfo()
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
  api.getInitialCards()
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
        },
        "#card-template",
        handleImageClick,
        handleDeleteCard
    ).generateCard();
  }
  /* -------------------------------------------------------------------------- */
  /*                               Popup Instances                              */
  /* -------------------------------------------------------------------------- */
  
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
  
  const deleteConfirm = new PopupWithConfirm("#delete-card-modal");
  deleteConfirm.setEventListeners();
  
  const avatarPopup = new PopupWithForm("#edit-avatar-modal", handleAvatarFormSubmit);
  avatarPopup.setEventListeners();
  
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleProfileFormSubmit(formData) {
  api
    .updateUserInfo({
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
    const cardData = {
      title: formData.title,
      url: formData.url
    };

    api.addCard(cardData)
      .then((savedCardData) => {
        console.log("Card saved to server:", savedCardData);

        if (savedCardData && savedCardData._id) {
          const card = createCard({
            name: savedCardData.name,
            link: savedCardData.link,
            _id: savedCardData._id
          });
          cardSection.addItem(card);
        } else {
          console.error("Card data missing _id:", savedCardData);
        }
      })
      .catch((error) => {
        console.error("Error adding card:", error);
      });
}
  
  function handleDeleteCard(card) {
    if (card._id) {
      console.log("Deleting card with ID:", card._id);
      deleteConfirm.setSubmitFunction(() => {
        api.deleteCard(card._id)
          .then(() => {
            console.log("Card deleted successfully:", card._id);
            card.handleDeleteCard();
          })
          .catch((error) => {
            console.error("Error Deleting Card:", error);
          });
      });
      deleteConfirm.open();
    } else {
      console.error("Card ID is missing:", card);
    }
  }
        
  function handleAvatarFormSubmit(formData) {
    avatarSubmitButton.textContent = "Saving...";
    
    const avatarUrl = formData.avatarUrl;
    
    console.log("Form Data Received:", formData);
    console.log("Avatar URL Received:", avatarUrl);

    if (!avatarUrl || avatarUrl.trim() === "") {
        console.error("Please enter a valid URL for your avatar.");
        alert("Please enter a valid URL for your avatar.");
        avatarSubmitButton.textContent = "Save";
        return;
    }

    console.log("Submitting avatar URL:", avatarUrl);

    api.updateUserAvatar(avatarUrl)
        .then((userData) => {
            console.log("API Response for Avatar Update:", userData);
            
            if (userData && userData.avatar) {
                avatarImage.src = userData.avatar;
                console.log("Avatar updated successfully:", userData.avatar);
            } else {
                console.error("Avatar URL missing in response");
            }
        })
        .catch((error) => {
            console.error("Error updating avatar:", error);
            alert("Error updating avatar. Please try again.");
        })
        .finally(() => {
            avatarSubmitButton.textContent = "Save";
        });
}
  
  /* -------------------------------------------------------------------------- */
  /*                            Set Button Listeners                            */
  /* -------------------------------------------------------------------------- */
  
  profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    profileFormPopup.open();
  });
  
  document.querySelector("#add-button").addEventListener("click", () => {
    addCardFormPopup.open();
  });
  
  avatarEditButton.addEventListener("click", () => {
    avatarPopup.open();
  });
  
  /* -------------------------------------------------------------------------- */
  /*                               Avatar Handling                              */
  /* -------------------------------------------------------------------------- */
  
  avatarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const avatarUrlInput = document.querySelector("#avatar-url").value.trim();

  if (!avatarUrlInput) {
    console.error("Avatar URL is empty");
    alert("Please enter a valid URL for your avatar.");
    return;
  }

  console.log("Avatar form submitted with URL:", avatarUrlInput);
  handleAvatarFormSubmit({ avatarUrl: avatarUrlInput });
});
  
  
 { // avatarForm.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   const formData = {
  //     avatarUrl: document.querySelector("#avatar-url").value,
  //   };
  //   handleAvatarFormSubmit(formData);
  // });
  }
  
  
  // const previewCardModal = document.querySelector("#preview-card-modal");
  






// function handleAddCardFormSubmit(formData) {
//   const cardData = { name: formData.title, link: formData.url };
//   cardSection.addItem(createCard(cardData));
// }


/* -------------------------------------------------------------------------- */
/*                               Card Rendering                               */
/* -------------------------------------------------------------------------- */


{

// const editAvatarModal = document.querySelector("#edit-avatar-modal");

// function openAvatarModal() {
//   editAvatarModal.classList.add("modal_opened");
// }

// function closeAvatarModal() {
//   editAvatarModal.classList.remove("modal_opened");
// }

// avatarEditButton.addEventListener("click", openAvatarModal);

// document
// .querySelector("#avatar-edit-modal-close-button")
// .addEventListener("click", closeAvatarModal);

// document
// .querySelector("#edit-avatar-form")
// .addEventListener("submit", function (event) {
//   event.preventDefault();
  
//   const avatarUrlInput = document.querySelector("#avatar-url").value;

//     document.querySelector(".profile__image").src = avatarUrlInput;

//     closeAvatarModal();
//   });
}


// const deleteCardModal = document.querySelector('#delete-card-modal');
// const modalCloseDeleteButton = document.querySelector('#modal-close-delete-button');
// const confirmDeleteButton = deleteCardModal.querySelector('#modal-delete-button');
// const deleteButtons = document.querySelectorAll('.card__delete-button');

// let cardToDelete = null;

// function openDeleteConfirmationModal(card) {
//   console.log("Opening delete modal for card:", card);
//   cardToDelete = card;
//   deleteCardModal.classList.add("modal_opened");
// }

// function confirmDelete() {
//   console.log("Deleting card instance:", cardToDelete);

//   if (cardToDelete && typeof cardToDelete.handleDeleteCard === "function") {
//       cardToDelete.handleDeleteCard();
//       cardToDelete = null;
//   } else {
//       console.error("handleDeleteCard is not a function on", cardToDelete);
//   }

//   deleteCardModal.classList.remove("modal_opened");
// }

// confirmDeleteButton.addEventListener("click", confirmDelete);
// modalCloseDeleteButton.addEventListener("click", () => {
//   deleteCardModal.classList.remove("modal_opened");
// });
  
/* -------------------------------------------------------------------------- */
/*                                   REMOVED                                  */
/* -------------------------------------------------------------------------- */

// const profileForm = document.querySelector("#edit-profile-form");
// const submitButton = profileForm.querySelector(".modal__button");

// function saveProfileFormSubmit(formData) {
//   submitButton.textContent = "Saving...";

//   api
//     .updateUserInfo(formData)
//     .then(() => {
//       console.log("Profile updated successfully");
//       submitButton.textContent = "Save";
//     })
//     .catch((error) => {
//       console.error("Error updating profile:", error);
//       submitButton.textContent = "Save";
//     });
// }

// profileForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const formData = {
//     name: document.querySelector("#profile-name").value,
//     description: document.querySelector("#profile-description").value,
//   };

//   saveProfileFormSubmit(formData);
// });






// handleDeleteCard.setEventListeners();
// editAvatarModal.setEventListeners();
