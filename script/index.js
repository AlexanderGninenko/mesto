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

const cardAddBtn = document.querySelector(".profile__add-btn");
const editProfileInfoBtn = document.querySelector(".profile__edit-btn");

const image = document.querySelector('.popup__image');
const imageDescription = document.querySelector('.popup__image-description');

const closeBtn = document.querySelectorAll(".popup__close-icon");


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
  
  photoImage.addEventListener('click', (e) => {
    showImage(e);
    togglePopup(imagePopup)();
  });

  return cardItem;
};

const renderNewCard = (e) => {
  e.preventDefault();
  const newCard = { name: placeNameInput.value, link: placeLinkInput.value };
  renderCardFromArray(createCard(newCard));
  placeNameInput.value = null;
  placeLinkInput.value = null;
  togglePopup(placePopup)();
 
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

const togglePopup = popup => () => popup.classList.toggle("popup_opened");

const renderCardFromArray = card => cardsContainer.prepend(card);

const deleteCard = e => e.target.closest(".photo-grid__item").remove();

const saveProfileInfo = (e) => {
  e.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  togglePopup(profilePopup)();
};

const isLiked = e => e.target.classList.toggle("photo-grid__like-btn_active");

cardAddBtn.addEventListener("click", togglePopup(placePopup));

editProfileInfoBtn.addEventListener("click", () => {
  togglePopup(profilePopup)();
  showProfileInfo();
});

closeBtn.forEach(btn => btn.addEventListener("click", ()=>{ 
  const activePopup = document.querySelector('.popup_opened');
  togglePopup(activePopup)();
}));

profilePopup.addEventListener("submit", saveProfileInfo);
placePopup.addEventListener("submit", renderNewCard);

initialCards.forEach(card => renderCardFromArray(createCard(card)));
