/* ИМПОРТЫ */
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

/* ПЕРЕМЕННЫЕ */
/* Popup - редактор профиля */
const popupProfileEdit = document.querySelector(".popup_profile-edit");
const popupEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const popupProfileTitle = popupProfileEdit.querySelector(
  ".popup__input_type_title"
);
const popupProfileSubTitle = popupProfileEdit.querySelector(
  ".popup__input_type_subtitle"
);
const popupProfileEditCloseButton = popupProfileEdit.querySelector(
  ".popup__close-button"
);
const popupProfileForm = popupProfileEdit.querySelector(".popup__form");
/* Карточки с изображениями */
const photoGrid = document.querySelector(".photo-grid");
/* Popup - добавление фото */
const addButton = document.querySelector(".profile__add-button");
const popupAddPhoto = document.querySelector(".popup_add-photo");
const addPhotoForm = popupAddPhoto.querySelector(".popup__form");
const popupAddPhotoCloseButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
const addPhotoTitle = popupAddPhoto.querySelector(
  ".popup__input_type_photo-name"
);
const addPhotoUrl = popupAddPhoto.querySelector(".popup__input_type_photo-url");
/* Popup - фото во весь экран */
const imagePopup = document.querySelector(".popup_image-fullscreen");
const imageFullscreen = imagePopup.querySelector(".popup__image");
const imageText = imagePopup.querySelector(".popup__image-fullscreen-text");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");

/* ФУНКЦИИ */
/* Очитска полей форм */
function clearForm(formName) {
  formName.reset();
}
/* Открытие и закрытие popup */
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupOverlay);
}

/* Закрытие popup по кнопке Esc */
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}

/* Закрытие popup по клику на оверлей */
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

/* Popup - закрытие добавление фото */
function closeAddPhotoPopup() {
  closePopup(popupAddPhoto);
}

/* Popup - открытие изображения во весь экран */
function handleCardClick(name, link) {
  imageFullscreen.src = link;
  imageFullscreen.alt = name;
  imageText.textContent = name;
  openPopup(imagePopup);
}

/* Popup - закрытие изображения во весь экран */
function closeImagePopup() {
  closePopup(imagePopup);
}

/* Popup - редактор профиля */
function closeProfileEditPopup() {
  closePopup(popupProfileEdit);
}

function openProfileEditPopup() {
  editProfileFormValidation.resetValidation();
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubTitle.value = profileSubTitle.textContent;
  openPopup(popupProfileEdit);
}

function formSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProfileTitle.value;
  profileSubTitle.textContent = popupProfileSubTitle.value;
  closePopup(popupProfileEdit);

}

/* Popup - добавление фото */
function openAddPhotoPopup() {
  addPhotoFormValidation.resetValidation();
  clearForm(addPhotoForm);
  openPopup(popupAddPhoto);
}

function addPhotoSubmit(evt) {
  evt.preventDefault();
  const addPhoto = {
    name: addPhotoTitle.value,
    link: addPhotoUrl.value,
  };
  photoGrid.prepend(createCard(addPhoto, ".photo-grid__template"));
  closePopup(popupAddPhoto);
  clearForm(addPhotoForm);
}

/* Создание новой карточки */
function createCard(item, cardSelector) {
  const newCard = new Card(item, cardSelector, handleCardClick);
  const cardElement = newCard.createCard();
  return cardElement;
}

/* Включение валидации */
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const addPhotoFormValidation = new FormValidator (validationConfig, popupAddPhoto);
addPhotoFormValidation.enableValidation();

const editProfileFormValidation = new FormValidator (validationConfig, popupProfileEdit);
editProfileFormValidation.enableValidation();

/* ОБРАБОТЧИКИ */
/* Popup - редактор профиля */
popupProfileEditCloseButton.addEventListener("click", closeProfileEditPopup);
popupProfileForm.addEventListener("submit", formSubmit);
popupEditButton.addEventListener("click", openProfileEditPopup);
/* Popup - добавление изображения */
addButton.addEventListener("click", openAddPhotoPopup);
popupAddPhotoCloseButton.addEventListener("click", closeAddPhotoPopup);
addPhotoForm.addEventListener("submit", addPhotoSubmit);
/* Popup - изображение во весь экран */
imagePopupCloseButton.addEventListener("click", closeImagePopup);


/*  МАССИВ С ФОТО */
const items = [
  {
    name: "Екатерининский Дворец",
    link: "https://static.tildacdn.com/tild3438-3739-4061-a537-333865346330/photo-grid_Catherine.jpg",
  },
  {
    name: "Эрмитаж",
    link: "https://static.tildacdn.com/tild6139-3366-4430-b331-303062316461/photo-grid_Hermitage.jpg",
  },
  {
    name: "Петергоф",
    link: "https://static.tildacdn.com/tild3233-3238-4033-b138-356432636231/photo-grid_Peterhof.jpg",
  },
  {
    name: "Екатериниский Дворец",
    link: "https://static.tildacdn.com/tild6364-3338-4261-b134-316664613663/photo-grid_PushkinMu.jpg",
  },
  {
    name: "Арка на Дворцовую площадь",
    link: "https://static.tildacdn.com/tild6239-3839-4138-b061-363833313862/photo-grid_Saint-Pet.jpg",
  },
  {
    name: "Здание 'Зингер'",
    link: "https://static.tildacdn.com/tild3934-3931-4762-a430-623061613638/photo-grid_ZingerHou.jpg",
  },
];

/* ЗАГРУЗКА ИЗОБРАЖЕНИЙ НА СТРАНИЦУ*/
function renderPhotoGrid() {
  items.forEach((item) => {
    photoGrid.prepend(createCard(item, ".photo-grid__template"));
  });

};
renderPhotoGrid(items);
