/* ИМПОРТЫ */
import "./index.css";
import {
  popupProfileEdit,
  popupEditButton,
  profileTitle,
  profileSubTitle,
  popupProfileTitle,
  popupProfileSubTitle,
  photoGrid,
  addButton,
  popupAddPhoto,
  addPhotoTitle,
  addPhotoUrl,
  imagePopup,
  validationConfig,
} from "../utils/constants.js";
import { defaultPhotos } from "../utils/defaultPhotos.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* Валидация popup добавления карточки */
const addPhotoFormValidation = new FormValidator(
  validationConfig,
  popupAddPhoto
);
addPhotoFormValidation.enableValidation();

/* Валидация popup редактирования профиля */
const editProfileFormValidation = new FormValidator(
  validationConfig,
  popupProfileEdit
);
editProfileFormValidation.enableValidation();

/* Popup - редактор профиля */
const profileInfo = new UserInfo(profileTitle, profileSubTitle);

const popupProfile = new PopupWithForm(popupProfileEdit, (data) => {
  console.log(data);
  profileInfo.setUserInfo(data);
  popupProfile.close();
  editProfileFormValidation.resetValidation();
});

popupProfile.setEventListeners();

popupEditButton.addEventListener("click", () => {
  const userData = profileInfo.getUserInfo();
  popupProfileTitle.value = userData.username;
  popupProfileSubTitle.value = userData.description;
  editProfileFormValidation.resetValidation();
  popupProfile.open();
});

/* Popup - изображение во весь экран */
const popupImageFullscreen = new PopupWithImage(imagePopup);
popupImageFullscreen.setEventListeners();

function handleCardClick(name, link) {
  popupImageFullscreen.open(name, link);
}

/* Popup - добавление фото */
const newPhoto = new PopupWithForm(popupAddPhoto, (item) => {
  const newCard = createCard(item, ".photo-grid__template");
  defaultCardList.addItem(newCard);
});

newPhoto.setEventListeners();

addButton.addEventListener("click", () => {
  newPhoto.open();
  addPhotoFormValidation.resetValidation();
});

/* ЗАГРУЗКА ИЗОБРАЖЕНИЙ НА СТРАНИЦУ*/
function createCard(item, cardSelector) {
  const newCard = new Card(item, cardSelector, handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

const defaultCardList = new Section(
  {
    items: defaultPhotos,
    renderer: (item) => {
      const cardElement = createCard(item, ".photo-grid__template");
      defaultCardList.addItem(cardElement);
    },
  },
  photoGrid
);

defaultCardList.renderItems();
