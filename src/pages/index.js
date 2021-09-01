/* ИМПОРТЫ */
import './index.css'
import {
  popupProfileEdit,
  popupEditButton,
  profileTitle,
  profileSubTitle,
  profileAvatar,
  popupProfileTitle,
  popupProfileSubTitle,
  photoGrid,
  addButton,
  popupAddPhoto,
  imagePopup,
  popupAvatarEdit,
  avatarEditButton,
  popupDeleteConfirm,
  validationConfig,
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

/* Настройки API */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',

  headers: {
    authorization: 'd08facf4-cfb9-4bbf-b1e2-fb8de78d9cf7',
    'Content-Type': 'application/json',
  },
})

let userId

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    profileInfo.setUserInfo(userInfo.name, userInfo.about)
    profileInfo.setUserAvatar(userInfo.avatar)
    userId = userInfo._id

    defaultCardList.renderItems(initialCards)
  })
  .catch((err) => {
    console.log(err)
  })

/* Валидация popup добавления карточки */
const addPhotoFormValidation = new FormValidator(
  validationConfig,
  popupAddPhoto
)
addPhotoFormValidation.enableValidation()

/* Валидация popup редактирования профиля */
const editProfileFormValidation = new FormValidator(
  validationConfig,
  popupProfileEdit
)
editProfileFormValidation.enableValidation()

/* Валидация popup редактирования аватара */
const changeAvatarFormValidation = new FormValidator(
  validationConfig,
  popupAvatarEdit
)
changeAvatarFormValidation.enableValidation()

/* 3. Редактирование профиля */
const profileInfo = new UserInfo(profileTitle, profileSubTitle, profileAvatar)

const popupProfile = new PopupWithForm(popupProfileEdit, (data) => {
  popupProfile.renderLoading(true)
  // console.log(data);
  api
    .patchUserInfo(data.name, data.about)
    .then((data) => {
      profileInfo.setUserInfo(data.name, data.about)

      popupProfile.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupProfile.renderLoading(false)
    })
})

popupProfile.setEventListeners()

popupEditButton.addEventListener('click', () => {
  const userData = profileInfo.getUserInfo()
  popupProfileTitle.value = userData.username
  popupProfileSubTitle.value = userData.description
  editProfileFormValidation.resetValidation()
  popupProfile.open()
})

/* 9. Обновление аватара */
const popupAvatar = new PopupWithForm(popupAvatarEdit, (data) => {
  popupAvatar.renderLoading(true)

  api
    .updateAvatar(data)
    .then((data) => {
      profileInfo.setUserAvatar(data)
    })
    .then(() => {
      popupAvatar.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatar.renderLoading(false)
    })
})

popupAvatar.setEventListeners()

avatarEditButton.addEventListener('click', () => {
  popupAvatar.open()
  changeAvatarFormValidation.resetValidation()
})

/* Popup - изображение во весь экран */
const popupImageFullscreen = new PopupWithImage(imagePopup)
popupImageFullscreen.setEventListeners()

function handleCardClick(name, link) {
  popupImageFullscreen.open(name, link)
}

/* 4. Добавление новой карточки */
const newPhoto = new PopupWithForm(popupAddPhoto, (item) => {
  newPhoto.renderLoading(true)

  api
    .addNewPhoto(item.name, item.link)
    .then((data) => {
      defaultCardList.addItem(createCard(data, '.photo-grid__template', userId))
    })
    .then(() => {
      newPhoto.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      newPhoto.renderLoading(false)
    })
})

newPhoto.setEventListeners()

addButton.addEventListener('click', () => {
  newPhoto.open()
  addPhotoFormValidation.resetValidation()
})

/* ЗАГРУЗКА ИЗОБРАЖЕНИЙ НА СТРАНИЦУ*/
/* Секция для фото */
const defaultCardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item, '.photo-grid__template', userId)
      defaultCardList.addItem(cardElement)
    },
  },
  photoGrid
)

/* Функция создания карточки с фото */
function createCard(item, cardSelector, userId) {
  const newCard = new Card(item, cardSelector, handleCardClick, userId, api, {
    handleCardDelete: () => {
      deletePopup.open(() => {
        deletePopup.renderLoading(true)

        api
          .deletePhoto(item._id)
          .then(() => {
            newCard.deletePhoto()
            deletePopup.close()
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            deletePopup.renderLoading(false)
          })
      })
    },
  })

  const cardElement = newCard.generateCard()

  return cardElement
}

/* Popup - удаления карточки */
const deletePopup = new PopupWithConfirm(popupDeleteConfirm)
deletePopup.setEventListeners()
