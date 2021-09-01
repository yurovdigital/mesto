export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = document.querySelector(formElement)
    this._formSelector = validationConfig.formSelector
    this._inputSelector = validationConfig.inputSelector
    this._submitButtonSelector = validationConfig.submitButtonSelector
    this._inactiveButtonClass = validationConfig.inactiveButtonClass
    this._inputErrorClass = validationConfig.inputErrorClass
    this._errorClass = validationConfig.errorClass
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    )
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    )
  }

  /* Показывает ошибки в input */
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    )
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  /* Скрывает ошибки в input */
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    )
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  /* Проверка валидации input */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  /* Активация кнопки */
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

  /* Слушатель на input */
  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  /* Включение валидации */
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }

  /* Очистка полей формы */
  resetValidation() {
    this._toggleButtonState()

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }
}
