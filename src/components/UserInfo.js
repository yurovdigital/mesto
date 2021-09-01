export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileAvatar) {
    this._name = profileTitle;
    this._description = profileSubtitle;
    this._avatar = profileAvatar;

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
  setUserInfo(name, about, avatar) {
    if (name) {
      this._name.textContent = name;
    }
    if (about) {
      this._description.textContent = about;
    }


  }

  setUserAvatar(avatar) {
    console.log(avatar)
    this._avatar.src = avatar;
  }
}
