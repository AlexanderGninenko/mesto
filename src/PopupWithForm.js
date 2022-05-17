import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;

        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');

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
        super.close()
        this._popupForm.reset()
    }
}
