
export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._card
    .querySelector('.card__image')
    .addEventListener('click', ()=> {
      this._handleCardClick({ 
        name: this._name,
        src: this._link })
    } )
  }

  _handleLikeClick() {
    this._card
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-btn_active");
  }

  _handleDeleteCard() {
    this._card.closest(".card").remove();
  }
}
