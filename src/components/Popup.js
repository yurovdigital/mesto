export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  /* Открытие popup */
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  /* Закрытие popup */
  close() {
    this._popup.classList.remove("popup_opened");
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
    this._popup.querySelector(".popup__close-button").addEventListener("click", () => {
      this.close();
    })

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.currentTarget);
      }
    })
  }

}
