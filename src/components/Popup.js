export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  /* Открытие popup */
  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  /* Закрытие popup */
  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);

  }

  /* Закрытие popup клавишей Esc */
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  /* Слушатели событий */
  setEventListeners() {
    this._popupSelector.querySelector(".popup__close-button").addEventListener("click", () => {
      this.close();
    })

    this._popupSelector.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.currentTarget);
      }
    })
  }

}
