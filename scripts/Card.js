import {openPopup, imagePopup, imageFullscreen, imageText} from "./index.js";

export default class Card {
	constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
	}

  _getTemplate() {
  	const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".photo-grid__card")
      .cloneNode(true);

    return cardElement;
  }

  _likePhoto(evt) {
    evt.target.classList.toggle("photo-grid__like-button_active");
  }

  _deletePhoto(evt) {
    evt.target.closest(".photo-grid__card").remove();
  }

  _openImagePopup() {
    openPopup(imagePopup);
    imageFullscreen.src = this._link;
    imageFullscreen.alt = this._name;
    imageText.textContent = this._name;
  }

  _setEventListeners() {
    this._cardElement.querySelector(".photo-grid__like-button").addEventListener('click', (evt) => {
      this._likePhoto(evt);
    });
    this._cardElement.querySelector(".photo-grid__delete-button").addEventListener('click', (evt) => {
			this._deletePhoto(evt);
		});
    this._cardElement.querySelector(".photo-grid__image").addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  createCard() {
    this._cardElement = this._getTemplate();
    const photoImage = this._cardElement.querySelector(".photo-grid__image");
    const photoTitle = this._cardElement.querySelector(".photo-grid__title");
    photoImage.src = this._link;
    photoTitle.alt = this._name;
    photoTitle.textContent = this._name;
    
    this._setEventListeners();

    return this._cardElement;
  }
}
