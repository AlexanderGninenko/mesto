
export default class Card {
  constructor(data, cardSelector, api, userId, {handleCardClick, handleLikeClick, handleConfirmDelete}) {
    this._data = data;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleConfirmDelete = handleConfirmDelete;

    this._api = api;
    this._id = this._data._id;
    this._ownerId = this._data.owner._id;
    this._userId = userId;
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
    this._card.querySelector(".card__like-count").textContent = this._data.likes.length;
    
    if(!(this._ownerId === this._userId)) {
      this._card.querySelector('.card__delete-btn').style.display = 'none';
    }

    if(this._data.likes.find((obj) => this._userId === obj._id)) {
      this._card.querySelector('.card__like-btn').classList.add('card__like-btn_active')
    }

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector(".card__like-btn")
      .addEventListener("click", () => this._handleLikeClick());

    this._card
      .querySelector(".card__delete-btn")
      .addEventListener("click", () => this._handleConfirmDelete());

    this._card
    .querySelector('.card__image')
    .addEventListener('click', ()=> {
      this._handleCardClick({ 
        name: this._name,
        src: this._link })
    } )
  }

  handleLikeCard() {
    const likeButton = this._view.querySelector('.card__like-btn');
    const likeCount = this._view.querySelector('.card__like-count');

    if(!(likeButton.classList.contains('card__like-btn_active'))) {
      this._api.like(this._id)
        .then((data) => {
          likeButton.classList.add('card__like-btn_active');
          likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._api.dislike(this._id)
        .then((data) => {
          likeButton.classList.remove('card__like-btn_active');
          likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  handleRemoveCard() {
    this._card.closest('.card').remove();
  }
}

  // _handleLikeClick() {
  //   this._card
  //     .querySelector(".card__like-btn")
  //     .classList.toggle("card__like-btn_active");
  // }

  // _handleDeleteCard() {
  //   this._card.closest(".card").remove();
  // }

