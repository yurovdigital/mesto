/* ПЕРЕМЕННЫЕ */
const popup = document.querySelector(".popup");
/* Popup - редактор профиля */
const popupProfileEdit = document.querySelector(".popup_profile-edit");
const popupEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const popupProfileTitle = popupProfileEdit.querySelector(".popup__input_type_title");
const popupProfileSubTitle = popupProfileEdit.querySelector(".popup__input_type_subtitle");
const popupProfileEditCloseButton = popupProfileEdit.querySelector(".popup__close-button");
const popupProfileForm = popupProfileEdit.querySelector(".popup__form");
/* Карточки с изображениями */
const photoGrid = document.querySelector(".photo-grid");
const photoGridTemplate = photoGrid.querySelector(".photo-grid__template").content;
const deleteButton = photoGrid.querySelector(".photo-grid__delete-button");
/* Popup - добавление фото */
const addButton = document.querySelector(".profile__add-button");
const popupAddPhoto = document.querySelector(".popup_add-photo");
const addPhotoForm = popupAddPhoto.querySelector(".popup__form");
const popupAddPhotoCloseButton = popupAddPhoto.querySelector(".popup__close-button");
const addPhotoTitle = popupAddPhoto.querySelector(".popup__input_type_photo-name");
const addPhotoUrl = popupAddPhoto.querySelector(".popup__input_type_photo-url");
/* Popup - фото во весь экран */
const photoGridItem = photoGrid.querySelector(".photo-grid__image");
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
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/* Popup - редактор профиля */
function closeProfileEditPopup() {
  closePopup(popupProfileEdit);
}

function openProfileEditPopup() {
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
  openPopup(popupAddPhoto);

}

function closeAddPhotoPopup() {
  closePopup(popupAddPhoto);
}

function addPhotoSubmit(evt) {
  evt.preventDefault();
  const addTitle = addPhotoTitle.value;
  const addUrl = addPhotoUrl.value
  const addPhoto = {
    name: addTitle,
    link: addUrl
  }

  prependPhotoItem(addPhoto);
  clearForm(addPhotoForm);
  closePopup(popupAddPhoto);
}

/* Popup - фото во весь экран */
function openImagePopup() {
  imagePopup.classList.toggle("popup_opened");

}

function imagePopupOpen (evt) {
  openImagePopup();
  imageFullscreen.src = evt.target.src;
  imageFullscreen.alt = evt.target.alt;
  imageText.textContent = evt.target.alt;
}

function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}

/* Добавление изображения на страницу */
function likePhoto(evt) {
  evt.target.classList.toggle("photo-grid__like-button_active");
}

function photoDelete(evt) {
  evt.target.closest(".photo-grid__card").remove();
}

function renderPhotoItem (item) {
  const photoItem = photoGridTemplate.cloneNode(true);
  const photoImage = photoItem.querySelector(".photo-grid__image");
  const photoTitle = photoItem.querySelector(".photo-grid__title");
  const likeButton = photoItem.querySelector(".photo-grid__like-button");
  const deleteButton = photoItem.querySelector(".photo-grid__delete-button");
  photoImage.src = item.link;
  photoImage.alt = item.name;
  photoTitle.textContent = item.name;

  likeButton.addEventListener("click", likePhoto);
  deleteButton.addEventListener("click", photoDelete);
  photoImage.addEventListener("click", imagePopupOpen);

  return photoItem;
}

function prependPhotoItem(item) {
  const addNewItem = renderPhotoItem(item);
  photoGrid.prepend(addNewItem);
}

function renderPhotoGrid(items) {
  items.forEach(prependPhotoItem);

}

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
renderPhotoGrid(items);










