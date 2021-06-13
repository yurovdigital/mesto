/* Открытие POPUP */
const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const popupProfileTitle = popup.querySelector('.popup__profile-title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const popupProfileSubTitle = popup.querySelector('.popup__profile-subtitle');

function openPopup() {
  popup.classList.toggle('popup_opened');
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubTitle.value = profileSubTitle.textContent;
}

popupEditButton.addEventListener('click', openPopup);

/* Закрытие POPUP */
const popupCloseButton = popup.querySelector('.popup__close-button');

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);

/* Отправка формы POPUP */
const popupSubmitButton = popup.querySelector('.popup__submit-button');

function formSubmit (evt){
  evt.preventDefault();
  profileTitle.textContent = popupProfileTitle.value;
  profileSubTitle.textContent = popupProfileSubTitle.value;
}

popupSubmitButton.addEventListener('submit', formSubmit);
