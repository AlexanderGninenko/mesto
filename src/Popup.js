export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
        
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target.classList.contains("popup__close-icon") || e.target === e.currentTarget ) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__close-icon')
        .addEventListener('click', ()=>this.close());
        this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this))
    }
}