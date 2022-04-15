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

const inputError = (`.${formInput.id}-error`);

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
  toggleBtnState(false, placeSaveBtn);
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

const toggleBtnState = (isFormValid, btn) => {
  if (isFormValid) {
    btn.removeAttribute("disabled");
    btn.classList.remove("popup__save-btn_disabled");
  } else {
    btn.setAttribute("disabled", true);
    btn.classList.add("popup__save-btn_disabled");
  }
};

const showInputError = () => {

}

profileForm.addEventListener("submit", saveProfileInfo);

placeForm.addEventListener("submit", renderNewCard);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    togglePopup(document.querySelector(".popup_opened"))();
  }
});

profileForm.addEventListener("input", () => {
  toggleBtnState(isInputValid(profileFormName, profileFormStatus), profileSaveBtn);
});

placeForm.addEventListener("input", () => {
  toggleBtnState(isInputValid(placeFormName, placeFormLink), placeSaveBtn);
});

const isInputValid = (formName, formStatus) => {
  if (formName.validity.valid && formStatus.validity.valid) {
    return true
  } else return false
}

popup.forEach((popup) =>
  popup.addEventListener("mousedown", closeOnOverlayClick)
);

initialCards.forEach((card) => renderCardFromArray(createCard(card)));
