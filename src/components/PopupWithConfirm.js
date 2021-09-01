import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._submitButtonText = this._submitButton.textContent;
    this._submitForm = submitForm;
  }

  open(cardId) {
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      this._cardId();
    })
  }

  renderLoading(isLoading) {
    if (isLoading) {

      this._submitButton.textContent = "Удаление...";

    } else {

      this._submitButton.textContent = this._submitButtonText;

    }
  }










}
