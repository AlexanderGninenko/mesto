import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "./../components/Api";
import PopupWithConfirm from "./../components/PopupWithConfirm";

import {
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
  profileFormNameSelector,
  profileFormStatusSelector,
  cardAddButton,
  profileEditInfoButton,
  avatarEditButton,
  popupDeleteConfirmSelector,
} from "../utils/constants.js";

const avatarEditFormValidation = new FormValidator(settings, avatarForm);
avatarEditFormValidation.enableValidation();

const profileFormValidation = new FormValidator(settings, profileForm);

profileFormValidation.enableValidation();

const placeFormValidation = new FormValidator(settings, placeForm);

placeFormValidation.enableValidation();

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "15b7f773-dbdf-4b9e-9380-ba8374828004",
    "Content-Type": "application/json",
  },
});

const confirmDeletePopup = new PopupWithConfirm(popupDeleteConfirmSelector);
confirmDeletePopup.setEventListeners();

const userInfo = new UserInfo({
  name: profileNameSelector,
  about: profileStatusSelector,
  avatar: profileAvatarSelector,
});

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, (newValues) => {
  profilePopup.renderLoading(true);
  api
    .sendUserInfo(newValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
});

profilePopup.setEventListeners();

const placePopup = new PopupWithForm(placePopupSelector, (newValues) => {
  placePopup.renderLoading(true);
  api
    .addUserCard(newValues)
    .then((data) => {
      const card = createCard(data);
      cardsList.addItem(card);
      placeFormValidation.disableSubmitButton();
      placePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => placePopup.renderLoading(false));
});

placePopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, (newValues) => {
  avatarPopup.renderLoading(true);
  api
    .handleUserAvatar(newValues)
    .then((data) => {
      userInfo.setUserAvatar(data);
      avatarEditFormValidation.disableSubmitButton();
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(cardSelector, api, userId, {
    data: data,
    handleCardClick: () => {
      imagePopup.open(data);
    },
    handleLikeClick: () => {
      card.handleLikeCard();
    },
    handleConfirmDelete: () => {
      
      confirmDeletePopup.setSubmitAction(() => {
        confirmDeletePopup.renderLoading(true);
        api.delete(data._id).then(() => {
          card.handleDeleteCard();
          confirmDeletePopup.close();
        })
          .catch((err) => console.log(err))
          .finally( () => confirmDeletePopup.renderLoading(false))
      })
      confirmDeletePopup.open()
    },
  });
  return card.generateCard();
};

const cardsList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
    },
  },
  cardsContainer
);

cardAddButton.addEventListener("click", () => {
  placeFormValidation.resetValidation();
  placeFormValidation.disableSubmitButton();
  placePopup.open();
});

profileEditInfoButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileFormNameSelector.value = userData.name;
  profileFormStatusSelector.value = userData.about;
  profileFormValidation.resetValidation();
  profileFormValidation.enableSubmitButton();
  profilePopup.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarEditFormValidation.resetValidation();
  avatarPopup.open();
});

let userId;

api
  .getAllNeededData()
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;

    cardsList.renderItems(cards);
  })
  .catch((err) => console.log(err));
