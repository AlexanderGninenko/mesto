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
const avatarForm = document.forms.popupAvatarEditForm;

const cardSelector = "#card-template";

const cardsContainer = ".photo-grid__wrapper";

const profileNameSelector = ".profile__name";
const profileStatusSelector = ".profile__status";
const profileAvatarSelector = ".profile__avatar";

const profilePopupSelector = ".popup_profile";
const placePopupSelector = ".popup_place";
const imagePopupSelector = ".popup_image";
const avatarPopupSelector = ".popup_avatar";

const placeFormNameSelector = document.querySelector(
  ".popup__input_place_name"
);
const placeFormLinkSelector = document.querySelector(
  ".popup__input_place_link"
);
const profileFormNameSelector = document.querySelector(
  ".popup__input_profile_name"
);
const profileFormStatusSelector = document.querySelector(
  ".popup__input_profile_status"
);

const cardAddButton = document.querySelector(".profile__add-btn");
const profileEditInfoButton = document.querySelector(".profile__edit-btn");
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

const popupDeleteConfirmSelector = ".popup_confirm-delete";

export {
  settings,
  profileForm,
  placeForm,
  avatarForm,
  cardSelector,
  cardsContainer,
  profileNameSelector,
  profileStatusSelector,
  profileAvatarSelector,
  profilePopupSelector,
  placePopupSelector,
  imagePopupSelector,
  avatarPopupSelector,
  placeFormNameSelector,
  placeFormLinkSelector,
  profileFormNameSelector,
  profileFormStatusSelector,
  cardAddButton,
  profileEditInfoButton,
  avatarEditButton,
  popupDeleteConfirmSelector
}