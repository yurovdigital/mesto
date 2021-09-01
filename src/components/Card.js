/* СОЗДАНИЕ КЛАССА */
export default class Card {
  constructor(items, cardSelector, handleCardClick, userId, api, { handleCardDelete }) {
    this._name = items.name;
    this._link = items.link;
    this._itemId = items._id; //ID карточки
    this._ownerId = items.owner._id; //ID создателя карточки
    this._likes = items.likes;
    this._userId = userId; //мой ID пользователя


    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo-grid__card")
      .cloneNode(true);

    return cardElement;
  }

  /* Лайки */
  _likePhoto() {
    this._likeButton.classList.toggle("photo-grid__like-button_active");
  }


  _setLike() {
    if (!this._likeButton.classList.contains("photo-grid__like-button_active")) {
      this._api.setLike(this._itemId)
        .then((res) => {

          this._likesCounter.textContent = res.likes.length;
          this._likePhoto();

        })

        .catch((err) => {
          console.log(err);
        })

    } else {
      this._api.deleteLike(this._itemId)
        .then((res) => {

          this._likesCounter.textContent = res.likes.length;
          this._likePhoto();

        })

        .catch((err) => {
          console.log(err);
        })

    }
  }

  /* Удаление фото */
  deletePhoto() {
    this._cardElement.remove();
  }


  /* Кнопка удаления на карточке */
  _hideDeleteButton() {
    this._deleteButton = this._cardElement.querySelector(".photo-grid__delete-button");

    if (this._ownerId === this._userId) {
      this._deleteButton.classList.remove("photo-grid__delete-button_hidden");
    } else {
      this._deleteButton.classList.add("photo-grid__delete-button_hidden");
    }
  }

  /* Слушатели событий */
  _setEventListeners() {
    this._cardElement
      .querySelector(".photo-grid__like-button")
      .addEventListener("click", () => {
        this._setLike();
      });
    this._cardElement
      .querySelector(".photo-grid__delete-button")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
    this._cardElement
      .querySelector(".photo-grid__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  /* Создание карточки */
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".photo-grid__image");
    this._cardTitle = this._cardElement.querySelector(".photo-grid__title");
    this._likeButton = this._cardElement.querySelector(".photo-grid__like-button");
    this._likesCounter = this._cardElement.querySelector(".photo-grid__like-counter")

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likesCounter.textContent = this._likes.length;


    this._likes.forEach((item) => {
      if (item._id === this._userId) {

        this._likeButton.classList.add("photo-grid__like-button_active");

      } else {

        this._likeButton.classList.remove("photo-grid__like-button_active");

      }
    })

    this._hideDeleteButton();
    this._setEventListeners();

    return this._cardElement;
  }
}
