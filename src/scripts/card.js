import { openModal } from "./modal.js";
import { deleteLike, likeIt } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const popupConfirm = document.querySelector(".popup_type_confirm"); // попап с подтверждением

function createCard(card, deleteFunction, likeFunction, openImageFunction, userId){
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-count");

  cardElement.dataset.cardId = card._id;
  cardElement.dataset.ownerId = card.owner._id;
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.description;

  // render likes проверка, если среди лайков карточки есть хотя бы один лайк пользователя то стиль лайка
  cardLikeCounter.textContent = card.likes.length;
  const userLiked = card.likes.some(like => like._id === userId);
  userLiked && cardLikeButton.classList.add("card__like-button_is-active");
  cardLikeButton.addEventListener("click", evt => likeFunction(evt, card._id));

  // установка слушателя на deleteButton/удаление deleteButton просле сравнения id_owner и userId
  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener("click", () => deleteFunction(card._id));
  } else {
    cardDeleteButton.remove();
  };
    cardImage.addEventListener("click", () => {
      openImageFunction(cardImage.src, cardImage.alt, cardTitle.textContent);
    });
  return cardElement;
};
function likeCard(evt, cardId){
 const cardLikes = document.querySelector('[data-card-id="' + cardId + '"]');
 const currentLikes = cardLikes.querySelector(".card__like-count");
 if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId) 
      .then((likedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = likedCard.likes.length;
      })
      .catch(err => console.log(err));
  } else {
    likeIt(cardId)
      .then((likedCard) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = likedCard.likes.length; // выяснить структуру объекта updatedCard
      })
      .catch(err => console.log(err));
  }
};

function deleteCard(cardId){
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
};

export { createCard, likeCard, deleteCard };