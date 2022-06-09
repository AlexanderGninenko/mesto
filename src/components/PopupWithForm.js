import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;

        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');

        this._popupButton = this._popupForm.querySelector('.popup__save-btn');
        this._popupButtonTextContent = this._popupButton.textContent;

    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', e => {
            e.preventDefault();
            this._submitForm(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    renderLoading(isLoading) {
        if(isLoading) {
          this._popupButton.textContent = 'Сохранение...';
        } else {
          this._popupButton.textContent = this._popupButtonTextContent;
        }
      }
}
