const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


const cardsContainer = document.querySelector('.photo-grid__wrapper');
const editBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close-icon');
const popupName = document.querySelector('.popup__input_profile_name');
const popupStatus = document.querySelector('.popup__input_profile_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const form = document.querySelector('.popup__form');

const createCard = (card) => {
    const template = document.querySelector('#card-template').content;
    const cardItem = template.querySelector('.photo-grid__item').cloneNode(true);
    let photoImageLink = cardItem.querySelector('.photo-grid__image');
    let photoImageAltName = cardItem.querySelector('.photo-grid__image');
    let cardItemTitle = cardItem.querySelector('.photo-grid__title');
    const likeBtn = cardItem.querySelector('.photo-grid__like-btn');
    const deleteBtn = cardItem.querySelector('.photo-grid__delete-btn');
    likeBtn.addEventListener('click', isLiked);
    deleteBtn.addEventListener('click', deleteCard);
    cardItemTitle.textContent = card.name;
    photoImageLink.src = card.link;
    photoImageAltName.alt = card.name;

    return cardItem;
}

const renderCard = (card) => {
    cardsContainer.prepend(card);

}

const deleteCard = e => e.target.closest('.photo-grid__item').remove();


const showProfilePopup =()=> {
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
    popup.classList.add('popup_opened');
}

const hideProfilePopup =()=> {
    popup.classList.remove('popup_opened');
}

const saveProfileInfo = (e) => {
    e.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    hideProfilePopup();
}

const isLiked = (e) => {
    e.target.classList.toggle('photo-grid__like-btn_active');
}


editBtn.addEventListener('click', showProfilePopup);
closeBtn.addEventListener('click', hideProfilePopup);
form.addEventListener('submit', saveProfileInfo);

initialCards.forEach(card => renderCard(createCard(card)));
