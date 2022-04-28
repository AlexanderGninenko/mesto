import FormValidator from "./FormValidator.js";
import Card from './Card.js';
import initialCards from "./cards.js";

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

const template = "#card-template";

const cardsContainer = document.querySelector(".photo-grid__wrapper");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const profilePopup = document.querySelector(".popup_profile");
const placePopup = document.querySelector(".popup_place");
export const imagePopup = document.querySelector(".popup_image");

const placeFormName = placeForm.elements.placeFormName;
const placeFormLink = placeForm.elements.placeFormLink;
const profileFormName = profileForm.elements.profileFormName;
const profileFormStatus = profileForm.elements.profileFormStatus;

const cardAddButton = document.querySelector(".profile__add-btn");
const profileEditInfoButton = document.querySelector(".profile__edit-btn");

const closeButtonList = document.querySelectorAll(".popup__close-icon");

const handleAddNewCard = (e) => {
  e.preventDefault();
  const newCard = new Card({name: placeFormName.value, link: placeFormLink.value }, template);
  renderCardFromArray(newCard.generateCard());
  closePopup(placePopup);
  placeForm.reset();
  placeFormValidation.disableSubmitButton();
};

const handleProfileInfo = () => {
  profileFormName.value = profileName.textContent;
  profileFormStatus.value = profileStatus.textContent;
};

export const openPopup = (popup) => {
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

const saveProfileInfo = (e) => {
  e.preventDefault();
  profileName.textContent = profileFormName.value;
  profileStatus.textContent = profileFormStatus.value;
  closePopup(profilePopup);
};

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

initialCards.forEach((card) =>{
  const newCard = new Card(card, template);
  renderCardFromArray(newCard.generateCard());
});
