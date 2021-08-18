import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._formInputs = this._form.querySelectorAll(".popup__input");
  }

  /* Получение данных из полей формы */
  _getInputValues() {
    this._formValues = {};

    this._formInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;

  }

  /* Слушатели событий */
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(evt, this._getInputValues());
      this.close();
    });
  }

  /* Закрытие popup и сброс формы */
  close() {
    super.close()
    this._form.reset();
  }

}
