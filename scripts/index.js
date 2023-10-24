// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(card, deleteFunction) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.alt;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteFunction);
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(event) {
  const removeElement = event.target.closest(".card");
  removeElement.remove();
}
// @todo: Вывести карточки на страницу
const appendCards = initialCards.map(function (card) {
  return createCard(card, deleteCard);
});
placesList.append(...appendCards);
