export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  /* Получение фото */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {

      headers: this._headers

    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }
  /* Получение инфо о пользователе */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {

      headers: this._headers

    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }
  /* Загрузка инфо о пользователе */
  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {

      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about

      })
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }

  /* Добавление фото */
  addNewPhoto(name, link) {
    return fetch(`${this._baseUrl}/cards`, {

      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })

    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }

  /* Удаление фото */
  deletePhoto(photoID) {
    return fetch(`${this._baseUrl}/cards/${photoID}`, {

      method: "DELETE",
      headers: this._headers

    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }

  /* Лайк фото */
  setLike(photoId) {
    return fetch(`${this._baseUrl}/cards/likes/${photoId}`, {

      method: "PUT",
      headers: this._headers,

    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }

  /* Снятие лайка */
  deleteLike(photoId) {
    return fetch(`${this._baseUrl}/cards/likes/${photoId}`, {

      method: "DELETE",
      headers: this._headers,

    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }

  /* Обновление аватара */
  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {

      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })

    })
  }

}
