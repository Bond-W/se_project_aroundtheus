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
const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = document.querySelector(".modal__form");

/* -------------------------------------------------------------------------- */
/*                        Buttons and other DOM Nodes                         */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

/* -------------------------------------------------------------------------- */
/*                                  Form Data                                 */
/* -------------------------------------------------------------------------- */

const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");


function closeModal (modal) {
    modal.classList.remove("modal_opened");
};


function openModal(modal) {
    modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal();
};

function getCardElement(cardData) {
    const cardEl = cardTemplate.cloneNode(true);
    const cardImageEl = cardEl.querySelector(".card__image");
    const cardNameEl = cardEl.querySelector(".card__name");

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardNameEl.textContent = cardData.name;

    return cardEl;
}

profileFormElement.addEventListener("submit", () => handleProfileFormSubmit(editProfileModal));
profileEditButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
     jobInput.value = profileDescription.textContent;
    openModal(editProfileModal);
});

profileModalCloseButton.addEventListener("click", () => closeModal(editProfileModal));
// add new card button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));

/* -------------------------------------------------------------------------- */
/*                                   ForEach                                  */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
    cardsWrap.prepend(getCardElement(cardData));
});