export default class UserInfo {
  constructor(username, description) {
    this._name = username;
    this._description = description;
  }

  /* Получение информации о пользователе */
  getUserInfo() {
    this._profileInfo = {};
    this._profileInfo.username = this._name.textContent;
    this._profileInfo.description = this._description.textContent;
    return this._profileInfo;
  }
  /* Изменение информации о пользователе */
  setUserInfo(username, description) {
    this._name.textContent = username;
    this._description.textContent = description;
  }
}
