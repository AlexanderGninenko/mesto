import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popupSelector.querySelector('.popup__form');

    this._popupButton = this._popupForm.querySelector('.popup__save-btn');
    this._popupButtonTextContent = this._popupButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', e => {
      e.preventDefault();
      this._handleDeleteCard();
    })
  }

  setSubmitAction(action) {
    this._handleDeleteCard = action;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...';
    } else {
      this._popupButton.textContent = this._popupButtonTextContent;
    }
  }
}