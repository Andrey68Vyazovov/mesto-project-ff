// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(card, deleteFunction, likeFunction, openImageFunction){
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunction);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeFunction);
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.alt;
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImageFunction);
  return cardElement;
};
// @todo: Функция лайка карточки
function likeCard(evt){
  evt.target.classList.toggle("card__like-button_is-active");
};
// @todo: Функция удаления карточки
function deleteCard(evt){
  const parent = evt.target.closest(".card");
  parent.remove();
};
// @todo: Вывести карточки на страницу
function renderCard(card, placesList, likeCard, deleteCard, openImage, renderPositionCard="end") {
  const cardElement = createCard(card, deleteCard, likeCard, openImage);
  return (renderPositionCard === "end")?placesList.append(cardElement):placesList.prepend(cardElement);
};
// @todo: Экспорт функций рендера, лайка и удаления карточки
export { renderCard, likeCard, deleteCard };