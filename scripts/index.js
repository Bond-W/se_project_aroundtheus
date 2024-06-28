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
const modal = document.querySelector(".modal");
const profileFormElement = document.querySelector(".modal__form");

/* -------------------------------------------------------------------------- */
/*                        Buttons and other DOM Nodes                         */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

/* -------------------------------------------------------------------------- */
/*                                  Form Data                                 */
/* -------------------------------------------------------------------------- */

const nameInput = document.querySelector("#profile-name-input");
const jobInput = document.querySelector("#profile-description-input");

function closeProfileModal () {
    modal.classList.remove("modal_opened");
};

function openProfileModal() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;

    modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeProfileModal();
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

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", openProfileModal);
profileCloseButton.addEventListener("click", closeProfileModal);

/* -------------------------------------------------------------------------- */
/*                                   ForEach                                  */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
    cardsWrap.prepend(getCardElement(cardData));
});