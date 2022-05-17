export default class UserInfo {
    constructor(userSelectors) {
        this._profileName = document.querySelector(userSelectors.name)
        this._profileStatus = document.querySelector(userSelectors.status)
    }

    getUserInfo() {
        this._userData = {
            name: this._profileName.textContent,
            status: this._profileStatus.textContent
        }
        return this._userData
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name
        this._profileStatus.textContent = data.status
    }
}