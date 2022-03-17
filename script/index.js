

const editBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close-icon');
const popupName = document.querySelector('.popup__profile-name');
const popupStatus = document.querySelector('.popup__profile-status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const form = document.querySelector('.popup__form');
// const likeBtn = document.querySelectorAll('.photo-grid__like-btn');



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

// const isLiked = (e) => {
//     e.target.classList.toggle('photo-grid__like-btn_active');
// }

// likeBtn.forEach(like => like.addEventListener('click', isLiked));


editBtn.addEventListener('click', showProfilePopup);
closeBtn.addEventListener('click', hideProfilePopup);
form.addEventListener('submit', saveProfileInfo);
