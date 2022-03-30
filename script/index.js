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

const cardsContainer = document.querySelector(".photo-grid__wrapper");
const popup = document.querySelector(".popup");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

const placeNameInput = document.querySelector(".popup__input_place_name");
const placeLinkInput = document.querySelector(".popup__input_place_link");
const popupProfileName = document.querySelector(".popup__input_profile_name");
const popupProfileStatus = document.querySelector(".popup__input_profile_status");

const profilePopup = document.querySelector(".popup_profile_form");
const placePopup = document.querySelector(".popup_place_form");
const imagePopup = document.querySelector('.popup_image_form');

const addNewCardBtn = document.querySelector(".profile__add-btn");
const editProfileInfoBtn = document.querySelector(".profile__edit-btn");

const image = document.querySelector('.popup__image');
const imageDescription = document.querySelector('.popup__image-description');

const createCard = (card) => {
  const template = document.querySelector("#card-template").content;
  const cardItem = template.querySelector(".photo-grid__item").cloneNode(true);
  let photoImage = cardItem.querySelector(".photo-grid__image");
  let cardItemTitle = cardItem.querySelector(".photo-grid__title");
  const likeBtn = cardItem.querySelector(".photo-grid__like-btn");
  const deleteBtn = cardItem.querySelector(".photo-grid__delete-btn");
  likeBtn.addEventListener("click", isLiked);
  deleteBtn.addEventListener("click", deleteCard);
  cardItemTitle.textContent = card.name;
  photoImage.src = card.link;
  photoImage.alt = card.name;
  
  photoImage.addEventListener('click', (e) => {
    showImage(e);
    openPopup(imagePopup)();
  });

  return cardItem;
};

const renderNewCard = (e) => {
  e.preventDefault();
  const newCard = { name: placeNameInput.value, link: placeLinkInput.value };
  renderCardfromArray(createCard(newCard));
  closePopup(placePopup)();
};

const showProfileInfo = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileStatus.value = profileStatus.textContent;
}

const showImage = (e) => {
  image.src = e.target.src;
  image.alt = e.target.alt;
  imageDescription.textContent = e.target.alt;
}

const openPopup = (popup) => () => {
  popup.classList.add('popup_opened');
  const closeBtn = popup.querySelector(".popup__close-icon");
  closeBtn.addEventListener("click", closePopup(popup));
};

const closePopup = popup => () => popup.classList.remove("popup_opened");

const renderCardfromArray = card => cardsContainer.prepend(card);

const deleteCard = e => e.target.closest(".photo-grid__item").remove();

const saveProfileInfo = (e) => {
  e.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  closePopup(profilePopup)();
};

const isLiked = e => e.target.classList.toggle("photo-grid__like-btn_active");

addNewCardBtn.addEventListener("click", openPopup(placePopup));

editProfileInfoBtn.addEventListener("click", () => {
  openPopup(profilePopup)();
  showProfileInfo();
});

profilePopup.addEventListener("submit", saveProfileInfo);
placePopup.addEventListener("submit", renderNewCard);

initialCards.forEach((card) => renderCardfromArray(createCard(card)));
