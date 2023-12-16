// @todo: import
import "../pages/index.css";
import { createCard, likeCard, openConfirmationForm } from "./card.js";
import { closeModal, openModal, closeModalOverlay } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import { getInitialData, postNewCard, patchAvatar, patchUserProfile, deleteCardServer } from "./api.js";

// @todo: constants
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const formEditProfile = document.forms["edit-profile"];
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms["new-place"];
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");

const popupAvatar = document.querySelector(".popup_type_avatar");
const formAvatar = document.forms["edit-avatar"];
const avatarEditButton = document.querySelector(".profile__image-box");
const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button");

let userId;

// конфигурация validation
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// функция проверки состояния запроса post и наименование кнопки по результату полученного состояния
const procedureSave = (flagSave, button) => button.textContent = flagSave?"Сохранение...":"Сохранить";

// функция передачи объекта данных пользователя c сервера блоку profile__info
const fillUserData = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

// @todo: functions
// функция открытия попапа с картинкой из карточки
const  openPopupImage = (imageSrc, imageAlt, imageTitle) => {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupImageCaption.textContent = imageTitle;
  openModal(popupTypeImage);
};

// колбэки
// функция удаления карточки с сервера
const handleConfirmDelete = () => {
  deleteCardServer(popupConfirm.dataset.cardId) 
    .then(() => {
      document.querySelector(`[data-card-id="${popupConfirm.dataset.cardId}"]`).remove();
      closeModal(popupConfirm);
    })
    .catch(err => console.log(err));
};

// функция отправки информации о новых данных пользователя на сервер
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  procedureSave(true, formEditProfile.querySelector(".popup__button"));
  patchUserProfile(formEditProfile.name.value, formEditProfile.description.value)
    .then((patchProfile) => {
      fillUserData(patchProfile);
      closeModal(popupTypeEdit);
      clearValidation(formEditProfile, validationConfig);
    })
    .catch(err => console.log(err))
    .finally(() => { procedureSave(false, formEditProfile.querySelector(".popup__button"));});
};

// функция отправки ссылки на новый аватар на сервер
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  procedureSave(true, formAvatar.querySelector(".popup__button"));
  patchAvatar(formAvatar.link.value)
    .then((patchProfile) => {
      fillUserData(patchProfile);
      closeModal(popupAvatar);
      clearValidation(formAvatar, validationConfig);
    })
    .catch(err => console.log(err))
    .finally(() => procedureSave(false, formAvatar.querySelector(".popup__button")));
};

// функция отправки новой карточки на сервер
const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = formNewPlace.elements["place-name"].value;
  const link = formNewPlace.elements["link"].value;
  procedureSave(true, formNewPlace.querySelector(".popup__button"));
  postNewCard(name, link)
    .then((newCard) => {
      renderCard(newCard, placesList, likeCard, openConfirmationForm, openPopupImage, "begin", userId);
      closeModal(popupTypeNewCard);
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
    })
    .catch(err => console.log(err))
    .finally(() => {procedureSave(false, formNewPlace.querySelector(".popup__button"));});
};

// функция заполнения попапа с данными пользователя
const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

// функция добавления карточки на страницу(DOM)
const renderCard = (card, placesList, likeCard, deleteCard, openImage, renderPositionCard="end", userId) => {
  const cardElement = createCard(card, deleteCard, likeCard, openImage, userId);
  return (renderPositionCard === "end")?placesList.append(cardElement):placesList.prepend(cardElement);
};

// функция добавления всех карточек на страницу
const renderCards = (initialCards, userId) => {
  initialCards.forEach((card) => {
    renderCard(card, placesList, likeCard, openConfirmationForm, openPopupImage, "begin", userId);
  });
};

// @todo: listeners
// слушатель закрытия попапа с картинкой по оверлею
popupTypeImage.addEventListener("click", evt => closeModalOverlay(evt));

// слушатель на кнопку открытия попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(formEditProfile, validationConfig);
  fillProfilePopup(formEditProfile, profileTitle.textContent, profileDescription.textContent);
  openModal(popupTypeEdit);
});

// слушатель на кнопку отправки формы редактирования профиля
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// слушатель на закрытие попапа редактирования профиля
popupTypeEdit.addEventListener("click", evt => closeModalOverlay(evt));

// слушатель кнопки добавления новой ссылки на аватар
avatarEditButton.addEventListener("click", evt => {
  clearValidation(formAvatar, validationConfig);
  formAvatar.reset();
  openModal(popupAvatar);
});

// слушатель на кнопку отправки формы с новой ссылкой на аватар
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

// слушатель на закрытие попапа с аватаром по оверлею
popupAvatar.addEventListener("click", evt => closeModalOverlay(evt));

// слушатель на  кнопку добавления новой карточки
profileAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(popupTypeNewCard);
});

// слушатель на кнопку отправки формы новой карточки
formNewPlace.addEventListener("submit", handleNewCardFormSubmit);

// слушатель на закрытие попапа с новой карточкой по оверлею
popupTypeNewCard.addEventListener("click", evt => closeModalOverlay(evt));

// слушатель на закрытие попапа с подтверждением действий пользователя по оверлею
popupConfirm.addEventListener("click", evt => closeModalOverlay(evt));

// слушатель на кнопку попапа подтверждения действий удаления карточки пользователем
popupConfirmButton.addEventListener("click", handleConfirmDelete);

// слушатели на элементы закрытия попапов
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close"))
    closeModal(popup);
  });
});

// @todo: initialCards
getInitialData()
  .then((result) => {
    userId = result[0]._id;
    fillUserData(result[0]);
    renderCards(result[1], result[0]._id);
  })
  .catch(err => console.log(err));

enableValidation(validationConfig);

