export default class UserInfo {
    constructor(userSelectors) {
        this._profileName = document.querySelector(userSelectors.name);
        this._profileStatus = document.querySelector(userSelectors.about);
        this._profileAvatar = document.querySelector(userSelectors.avatar);
    }

    getUserInfo() {
        this._userData = {
            name: this._profileName.textContent,
            about: this._profileStatus.textContent
        }
        return this._userData;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileStatus.textContent = data.about;
        this.setUserAvatar(data);
    }

    setUserAvatar(data) {
        this._profileAvatar.src = data.avatar;
      }
}