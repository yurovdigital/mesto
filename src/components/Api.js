export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _hanldeResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  /* Получение фото */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._hanldeResponse(res))
  }

  /* Получение инфо о пользователе */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._hanldeResponse(res))
  }

  /* Загрузка инфо о пользователе */
  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._hanldeResponse(res))
  }

  /* Добавление фото */
  addNewPhoto(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._hanldeResponse(res))
  }

  /* Удаление фото */
  deletePhoto(photoID) {
    return fetch(`${this._baseUrl}/cards/${photoID}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._hanldeResponse(res))
  }

  /* Лайк фото */
  setLike(photoId) {
    return fetch(`${this._baseUrl}/cards/likes/${photoId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._hanldeResponse(res))
  }

  /* Снятие лайка */
  deleteLike(photoId) {
    return fetch(`${this._baseUrl}/cards/likes/${photoId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._hanldeResponse(res))
  }

  /* Обновление аватара */
  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._hanldeResponse(res))
  }
}
