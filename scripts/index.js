/* Переменные */
const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const popupProfileTitle = popup.querySelector('.popup__input_type_title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const popupProfileSubTitle = popup.querySelector('.popup__input_type_subtitle');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSubmitButton = popup.querySelector('.popup__submit-button');
const popupForm = popup.querySelector('.popup__form');

/* Функции */
function openPopup() {
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubTitle.value = profileSubTitle.textContent;
  popup.classList.toggle('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmit (evt){
  evt.preventDefault();
  profileTitle.textContent = popupProfileTitle.value;
  profileSubTitle.textContent = popupProfileSubTitle.value;
  closePopup();
}

/* Обработчики */
popupEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmit);
