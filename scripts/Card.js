import { openPopup, imagePopup } from './index.js';

export default class Card {
    constructor(data, cardSelector) {
        this._data = data;
        this._cardSelector = cardSelector;
        
    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.querySelector(".photo-grid__item").cloneNode(true);
        return cardTemplate;
    }

    generateCard() {
        this._card = this._getCardTemplate();
        this._setEventListeners();
        this._card.querySelector(".photo-grid__image").src = this._data.link;
        this._card.querySelector(".photo-grid__image").alt = this._data.name;
        this._card.querySelector(".photo-grid__title").textContent = this._data.name;
        return this._card;
    }

    _setEventListeners() {
        this._card.querySelector(".photo-grid__like-btn").addEventListener("click", this._handleLikeClick);
        this._card.querySelector(".photo-grid__delete-btn").addEventListener("click", this._handleDeleteCard);
        this._card.querySelector(".photo-grid__image").addEventListener("click", (e) => this._handleImage(e));
    }

    _handleLikeClick() {
        this.classList.toggle("photo-grid__like-btn_active");
    }

    _handleDeleteCard() {
        this.closest(".photo-grid__item").remove();
    }

    _handleImage(e) {
        const image = document.querySelector(".popup__image");
        const imageDescription = document.querySelector(".popup__image-description");
        image.src = e.target.src;
        image.alt = e.target.alt;
        imageDescription.textContent = e.target.alt;
        openPopup(imagePopup);
    }

}
