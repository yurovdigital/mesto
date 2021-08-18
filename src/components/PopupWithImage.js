import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFullscreen = document.querySelector(".popup__image");
    this._imageText = document.querySelector(".popup__image-fullscreen-text");
  }

  open(name, link) {
    this._imageFullscreen.src = link;
    this._imageText.textContent = name;
    super.open();
  }
}

