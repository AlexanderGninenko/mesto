import { openPopup, imagePopup } from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._card = this._getCardTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    this._setEventListeners();
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._card.querySelector(".card__title").textContent = this._data.name;
    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector(".card__like-btn")
      .addEventListener("click", this._handleLikeClick.bind(this));
    this._card
      .querySelector(".card__delete-btn")
      .addEventListener("click", this._handleDeleteCard.bind(this));
    this._cardImage.addEventListener("click", (e) => this._handleImage(e));
  }

  _handleLikeClick() {
    this._card
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-btn_active");
  }

  _handleDeleteCard() {
    this._card.closest(".card").remove();
  }

  _handleImage(e) {
    const image = document.querySelector(".popup__image");
    const imageDescription = document.querySelector(
      ".popup__image-description"
    );
    image.src = e.target.src;
    image.alt = e.target.alt;
    imageDescription.textContent = e.target.alt;
    openPopup(imagePopup);
  }
}
