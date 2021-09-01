/* Popup - редактирование профиля */
export const popupProfileEdit = '.popup_profile-edit'
export const popupEditButton = document.querySelector('.profile__edit-button')
export const profileTitle = document.querySelector('.profile__title')
export const profileSubTitle = document.querySelector('.profile__subtitle')
export const profileAvatar = document.querySelector('.profile__avatar')
export const popupProfileTitle = document.querySelector(
  '.popup__input_type_title'
)
export const popupProfileSubTitle = document.querySelector(
  '.popup__input_type_subtitle'
)
/* Карточки с изображениями */
export const photoGrid = '.photo-grid'
/* Popup - добавление фото */
export const addButton = document.querySelector('.profile__add-button')
export const popupAddPhoto = '.popup_add-photo'
export const addPhotoTitle = document.querySelector(
  '.popup__input_type_photo-name'
)
export const addPhotoUrl = document.querySelector(
  '.popup__input_type_photo-url'
)
/* Popup - фото во весь экран */
export const imagePopup = '.popup_image-fullscreen'
export const popupAvatarEdit = '.popup_edit-avatar'
export const avatarEditButton = document.querySelector(
  '.profile__avatar-overlay'
)
export const popupDeleteConfirm = '.popup_confirm-delete'

/* Конфиг валидации */
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
