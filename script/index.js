

const edit_btn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const close_btn = document.querySelector('.popup__close-icon');
const popup_name = document.querySelector('.popup__name');
const popup_status = document.querySelector('.popup__status');
const profile_name = document.querySelector('.profile__name');
const profile_status = document.querySelector('.profile__status');
const form = document.querySelector('.popup__form');
const like_btn = document.querySelectorAll('.photo-grid__like-btn');



const show =()=> {
    popup_name.value = profile_name.textContent;
    popup_status.value = profile_status.textContent;
    popup.classList.add('popup_opened');
}

const hide =()=> {
    popup.classList.remove('popup_opened');
}

const save = (e) => {
    e.preventDefault();
    profile_name.textContent = popup_name.value;
    profile_status.textContent = popup_status.value;
    hide();
}

const isLiked = (e) => {
    e.target.classList.toggle('photo-grid__like-btn_active');
}

like_btn.forEach(like => like.addEventListener('click', isLiked));


edit_btn.addEventListener('click', show);
close_btn.addEventListener('click', hide);
form.addEventListener('submit', save);
