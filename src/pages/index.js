import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import initialCards from "../utils/constants.js";
import './index.css';
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

const cardSelector = "#card-template";

const cardsContainer = ".photo-grid__wrapper";

const profileNameSelector = ".profile__name";
const profileStatusSelector = ".profile__status";

const profilePopupSelector = ".popup_profile";
const placePopupSelector = ".popup_place";
const imagePopupSelector = ".popup_image";

const placeFormNameSelector = document.querySelector('.popup__input_place_name');
const placeFormLinkSelector = document.querySelector('.popup__input_place_link');
const profileFormNameSelector = document.querySelector('.popup__input_profile_name');
const profileFormStatusSelector = document.querySelector('.popup__input_profile_status');

const cardAddButton = document.querySelector(".profile__add-btn");
const profileEditInfoButton = document.querySelector(".profile__edit-btn");

const userInfo = new UserInfo({name: profileNameSelector, status: profileStatusSelector});

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, () => {
  userInfo.setUserInfo({
    name : profileFormNameSelector.value,
    status : profileFormStatusSelector.value
  });
  profilePopup.close();
})
profilePopup.setEventListeners();

const placePopup = new PopupWithForm(placePopupSelector, () => {
  const card = createCard({
    name: placeFormNameSelector.value,
    link: placeFormLinkSelector.value
  });
  
  cardsList.addItem(card);
  placeFormValidation.disableSubmitButton();
  placePopup.close();
})
placePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(data, cardSelector, {handleCardClick: ()=>{
    imagePopup.open(data);
  }});
  return card.generateCard();
};

cardAddButton.addEventListener("click", () => {
  placeFormValidation.resetValidation();
  placeFormValidation.disableSubmitButton();
  placePopup.open();
});

profileEditInfoButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileFormNameSelector.value = userData.name;
  profileFormStatusSelector.value = userData.status;
  profileFormValidation.resetValidation();
  profileFormValidation.enableSubmitButton();
  profilePopup.open();
});

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
  }
},
cardsContainer
)

cardsList.renderItems();