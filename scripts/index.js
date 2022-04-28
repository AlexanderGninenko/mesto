import FormValidator from "./validate.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: ".popup__input-error",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClassActive: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileForm = document.forms.popupProfileForm;
const placeForm = document.forms.popupPlaceForm;

const profileFormValidation = new FormValidator(settings, profileForm);

profileFormValidation.enableValidation();

const placeFormValidation = new FormValidator(settings, placeForm);

placeFormValidation.enableValidation();

const template = document.querySelector("#card-template").content;

const cardsContainer = document.querySelector(".photo-grid__wrapper");
const popupList = document.querySelectorAll(".popup");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const profilePopup = document.querySelector(".popup_profile");
const placePopup = document.querySelector(".popup_place");
const imagePopup = document.querySelector(".popup_image");

const placeFormName = placeForm.elements.placeFormName;
const placeFormLink = placeForm.elements.placeFormLink;
const profileFormName = profileForm.elements.profileFormName;
const profileFormStatus = profileForm.elements.profileFormStatus;

const cardAddButton = document.querySelector(".profile__add-btn");
const profileEditInfoButton = document.querySelector(".profile__edit-btn");

const image = document.querySelector(".popup__image");
const imageDescription = document.querySelector(".popup__image-description");

const closeButtonList = document.querySelectorAll(".popup__close-icon");
const profileSaveButton = document.querySelector(".popup__save-btn_profile");
const placeSaveButton = document.querySelector(".popup__save-btn_place");

const createCard = (card) => {
  const cardItem = template.querySelector(".photo-grid__item").cloneNode(true);
  const photoImage = cardItem.querySelector(".photo-grid__image");
  const cardItemTitle = cardItem.querySelector(".photo-grid__title");
  const likeButton = cardItem.querySelector(".photo-grid__like-btn");
  const deleteButton = cardItem.querySelector(".photo-grid__delete-btn");
  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardItemTitle.textContent = card.name;
  photoImage.src = card.link;
  photoImage.alt = card.name;

  photoImage.addEventListener("click", (e) => {
    handleImage(e);
    openPopup(imagePopup);
  });

  return cardItem;
};

const handleAddNewCard = (e) => {
  e.preventDefault();
  const newCard = { name: placeFormName.value, link: placeFormLink.value };
  renderCardFromArray(createCard(newCard));
  closePopup(placePopup);
  placeForm.reset();
  placeFormValidation.disableSubmitButton();
};

const handleProfileInfo = () => {
  profileFormName.value = profileName.textContent;
  profileFormStatus.value = profileStatus.textContent;
};

const handleImage = (e) => {
  image.src = e.target.src;
  image.alt = e.target.alt;
  imageDescription.textContent = e.target.alt;
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleCloseOnEscapeKey);
  popup.addEventListener("mousedown", closeOnOverlayClick);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleCloseOnEscapeKey);
  popup.removeEventListener("mousedown", closeOnOverlayClick);
};

const renderCardFromArray = (card) => cardsContainer.prepend(card);

const handleDeleteCard = (e) => e.target.closest(".photo-grid__item").remove();

const saveProfileInfo = (e) => {
  e.preventDefault();
  profileName.textContent = profileFormName.value;
  profileStatus.textContent = profileFormStatus.value;
  closePopup(profilePopup);
};

const handleLikeClick = (e) =>
  e.target.classList.toggle("photo-grid__like-btn_active");

closeButtonList.forEach((button) =>
  button.addEventListener("click", (e) => {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  })
);

const closeOnOverlayClick = (e) => {
  if (e.target === e.currentTarget) {
    closePopup(e.target);
  }
};

const handleCloseOnEscapeKey = (e) => {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

cardAddButton.addEventListener("click", () => {
  placeFormValidation.resetValidation();
  openPopup(placePopup);
});

profileEditInfoButton.addEventListener("click", () => {
  handleProfileInfo();
  profileFormValidation.resetValidation();
  profileFormValidation.enableSubmitButton();
  openPopup(profilePopup);
});
profileForm.addEventListener("submit", saveProfileInfo);

placeForm.addEventListener("submit", handleAddNewCard);

initialCards.forEach((card) => renderCardFromArray(createCard(card)));
