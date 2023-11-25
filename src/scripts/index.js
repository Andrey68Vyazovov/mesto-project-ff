// @todo: import
import "../pages/index.css";
import { initialCards } from "./cards.js";
import { renderCard, likeCard, deleteCard } from "./card.js";
import { closeModal, openModal, closeModalOverlay } from "./modal.js";

// @todo: constants
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms["new-place"];
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// @todo: functions
function openPopupImage(evt){
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.parentNode.textContent.trim();
  openModal(popupTypeImage);
};

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.name.value;
  profileDescription.textContent = formEditProfile.description.value;
  closeModal(popupTypeEdit); 
};

function fillProfilePopup(form, name, description){
  form.elements.name.value = name;
  form.elements.description.value = description;
};

// @todo: listeners
// EventListener: close the popupTypeImage overlay
popupTypeImage.addEventListener("click", function(evt){
  closeModalOverlay(evt);
});
// EventListener: open the popupTypeEdit
profileEditButton.addEventListener("click", function(){
  fillProfilePopup(formEditProfile, profileTitle.textContent, profileDescription.textContent);
  openModal(popupTypeEdit);
});
// EventListener: submit the formEditProfile
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
// EventListener: close the popupTypeEdit overlay
popupTypeEdit.addEventListener("click", function(evt){ 
  closeModalOverlay(evt);
});
// EventListener: open the popupTypeNewCard
profileAddButton.addEventListener("click", function(){
  openModal(popupTypeNewCard);
});
// EventListener: submit the formNewPlace
formNewPlace.addEventListener("submit", function(evt){
  evt.preventDefault();
  const name = formNewPlace.elements["place-name"].value;
  const link = formNewPlace.elements["link"].value;
  const alt = name;
  const newCard = {name, link, alt};
  renderCard(newCard, placesList, likeCard, deleteCard, openPopupImage, "begin");
  closeModal(popupTypeNewCard);
  formNewPlace.reset();
});
// EventListener: close the popupTypeNewCard overlay
popupTypeNewCard.addEventListener("click", function(evt){
  closeModalOverlay(evt);
});
// EventListener: close a popup
document.addEventListener("click", function(evt){
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.parentNode.parentNode);
  }
});

// @todo: initialCards
initialCards.map(function(card) {
  return renderCard(card, placesList, likeCard, deleteCard, openPopupImage);});

