export default class UserInfo {
  constructor(profileTitle, profileSubtitle) {
    this._name = profileTitle;
    this._description = profileSubtitle;
    this._profileName = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__subtitle");
  }

  /* Получение информации о пользователе */
  getUserInfo() {
    this._profileInfo = {};
    this._profileInfo.username = this._name.textContent;
    this._profileInfo.description = this._description.textContent;
    return this._profileInfo;
  }

  /* Изменение информации о пользователе */
  setUserInfo({ profiletitle, profilesubtitle }) {
    if (profiletitle) {
      this._name.textContent = profiletitle;
    }
    if (profilesubtitle) {
      this._description.textContent = profilesubtitle;
    }
  }
}
