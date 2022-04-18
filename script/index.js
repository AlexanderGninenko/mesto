const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const template = document.querySelector("#card-template").content;

const cardsContainer = document.querySelector(".photo-grid__wrapper");
const popup = document.querySelectorAll(".popup");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const profileForm = document.forms.popupProfileForm;
const placeForm = document.forms.popupPlaceForm;

const profilePopup = document.querySelector(".popup_profile");
const placePopup = document.querySelector(".popup_place");
const imagePopup = document.querySelector(".popup_image");

const placeFormName = placeForm.elements.placeFormName;
const placeFormLink = placeForm.elements.placeFormLink;
const profileFormName = profileForm.elements.profileFormName;
const profileFormStatus = profileForm.elements.profileFormStatus;


const cardAddBtn = document.querySelector(".profile__add-btn");
const editProfileInfoBtn = document.querySelector(".profile__edit-btn");

const image = document.querySelector(".popup__image");
const imageDescription = document.querySelector(".popup__image-description");

const closeBtn = document.querySelectorAll(".popup__close-icon");
const profileSaveBtn = document.querySelector(".popup__save-btn_profile");
const placeSaveBtn = document.querySelector(".popup__save-btn_place");

const createCard = (card) => {
  const cardItem = template.querySelector(".photo-grid__item").cloneNode(true);
  const photoImage = cardItem.querySelector(".photo-grid__image");
  const cardItemTitle = cardItem.querySelector(".photo-grid__title");
  const likeBtn = cardItem.querySelector(".photo-grid__like-btn");
  const deleteBtn = cardItem.querySelector(".photo-grid__delete-btn");
  likeBtn.addEventListener("click", isLiked);
  deleteBtn.addEventListener("click", deleteCard);
  cardItemTitle.textContent = card.name;
  photoImage.src = card.link;
  photoImage.alt = card.name;

  photoImage.addEventListener("click", (e) => {
    showImage(e);
    togglePopup(imagePopup)();
  });

  return cardItem;
};


const renderNewCard = (e) => {
  e.preventDefault();
  const newCard = { name: placeFormName.value, link: placeFormLink.value };
  renderCardFromArray(createCard(newCard));
  placeForm.reset();
  togglePopup(placePopup)();
  
};

const showProfileInfo = () => {
  profileFormName.value = profileName.textContent;
  profileFormStatus.value = profileStatus.textContent;
};

const showImage = (e) => {
  image.src = e.target.src;
  image.alt = e.target.alt;
  imageDescription.textContent = e.target.alt;
};

const togglePopup = (popup) => () => popup.classList.toggle("popup_opened");

const renderCardFromArray = (card) => cardsContainer.prepend(card);

const deleteCard = (e) => e.target.closest(".photo-grid__item").remove();

const saveProfileInfo = (e) => {
  e.preventDefault();
  profileName.textContent = profileFormName.value;
  profileStatus.textContent = profileFormStatus.value;
  togglePopup(profilePopup)();
};

const isLiked = (e) => e.target.classList.toggle("photo-grid__like-btn_active");

cardAddBtn.addEventListener("click", togglePopup(placePopup));

editProfileInfoBtn.addEventListener("click", () => {
  togglePopup(profilePopup)();
  showProfileInfo();
});

closeBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const activePopup = document.querySelector(".popup_opened");
    togglePopup(activePopup)();
  })
);

const closeOnOverlayClick = (e) => {
  if (e.target.classList.contains("popup_opened")) {
    togglePopup(e.target)();
  }
};


profileForm.addEventListener("submit", saveProfileInfo);

placeForm.addEventListener("submit", renderNewCard);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    togglePopup(document.querySelector(".popup_opened"))();
  }
});

/////////////////////////////////////////////////////////////////

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
    console.log(settings);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;

  }
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement, settings) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
   setEventListeners(formElement, settings);
  });
};


/////////////////////////////////////////////////////////////////////////////

popup.forEach((popup) =>
  popup.addEventListener("mousedown", closeOnOverlayClick)
);

initialCards.forEach((card) => renderCardFromArray(createCard(card)));

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  errorClass: 'popup__input-error_active'
}


enableValidation(settings);