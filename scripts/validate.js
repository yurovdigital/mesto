/* Показывает ошибки в input */
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

/* Скрывает ошибки в input */
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = '';
}

/* Проверка валидации input */
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

/* Активация кнопки */
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {

    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("popup__submit-button_disabled");

  }
  else {

    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__submit-button_disabled");

  }
}

/* Слушатель на input */
function setEventListeners(formElement, inputSelector, submitButtonSelector) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {

      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);

    })
  })
}

/* ФУНКЦИЯ ВАЛИДАЦИИ */
function enableValidation({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, rest.inputSelector, rest.submitButtonSelector);
  })
}

/* АКТИВАЦИЯ ФУНКЦИИ ВАЛИДАЦИИ */
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });
