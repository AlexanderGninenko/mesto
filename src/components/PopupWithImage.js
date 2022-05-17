import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupDescription = this._popupSelector.querySelector('.popup__image-description');
    }

    open(data) {
        super.open();
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupDescription.textContent = data.name;
    }
}