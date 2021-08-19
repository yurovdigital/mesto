/* СОЗДАНИЕ КЛАССА */
export default class Card {
  constructor(items, cardSelector, handleCardClick) {
    this._name = items.name;
    this._link = items.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo-grid__card")
      .cloneNode(true);

    return cardElement;
  }

  /* Лайк фото */
  _likePhoto(evt) {
    evt.target.classList.toggle("photo-grid__like-button_active");
  }

  /* Удаление фото */
  _deletePhoto(evt) {
    evt.target.closest(".photo-grid__card").remove();
  }

  /* Слушатели событий */
  _setEventListeners() {
    this._cardElement
      .querySelector(".photo-grid__like-button")
      .addEventListener("click", (evt) => {
        this._likePhoto(evt);
      });
    this._cardElement
      .querySelector(".photo-grid__delete-button")
      .addEventListener("click", (evt) => {
        this._deletePhoto(evt);
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
    const cardImage = this._cardElement.querySelector(".photo-grid__image");
    const cardTitle = this._cardElement.querySelector(".photo-grid__title");


    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
