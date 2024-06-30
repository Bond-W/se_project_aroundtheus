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
    }
];

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

/* -------------------------------------------------------------------------- */
/*                                  Wrappers                                  */
/* -------------------------------------------------------------------------- */

const cardsWrap = document.querySelector(".cards__list");

/* -------------------------------------------------------------------------- */
/*                        Buttons and other DOM Nodes                         */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileModalCloseButton = editProfileModal.querySelector("#profile-edit-modal-close-button");
// const profileFormElement = editProfileModal.querySelector("#edit-profile-form");
const profileEditForm = document.forms["#profile-form"];
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");

/* -------------------------------------------------------------------------- */
/*                                  Add card                                  */
/* -------------------------------------------------------------------------- */

const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector("#add-card-form");
const addNewCardButton = document.querySelector("#add-button");
const addCardModalCloseButton = addCardModal.querySelector("#add-modal-close-button");

const cardNameInput = document.querySelector("#card-name-input");
const cardUrlInput = document.querySelector("#card-image-input");

const cardTitleInput = addCardFormElement.querySelector("#card-name-input");
const urlInput = addCardFormElement.querySelector("#card-image-input");
/* -------------------------------------------------------------------------- */
/*                                  Form Data                                 */
/* -------------------------------------------------------------------------- */



function closeModal (modal) {
    modal.classList.remove("modal_opened");
};


function openModal(modal) {
    modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
    const cardEl = cardTemplate.cloneNode(true);
    const cardImageEl = cardEl.querySelector(".card__image");
    const cardNameEl = cardEl.querySelector(".card__name");
    
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardNameEl.textContent = cardData.name;
    
    return cardEl;
}

function renderCard(cardData, wrapper) {
    cardEl = getCardElement(cardData);
    wrapper.prepend(cardEl);
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfileModal);
};


function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardNameInput.value;
    const link = UrlInput.value;
    renderCard({name, link}, cardsWrap);
    closeModal(addCardModal);
    e.target.reset();
}



profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    editProfileModal.classList.add("modal_opened")
});

addNewCardButton.addEventListener("click", () => {
    addCardModal.classList.add("modal_opened");
});

profileModalCloseButton.addEventListener("click", () => closeModal(editProfileModal));

addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));

initialCards.forEach((cardData) => {
      const cardEl = getCardElement(cardData);
    });
    
    cardsWrap.prepend(cardEl);
