function openModal(element){
  element.classList.add("popup_is-opened");
  element.classList.remove("popup_is-animated");
  document.addEventListener("keydown", closeModalEscape);
};

function closeModal(element){
  element.classList.remove("popup_is-opened");
  element.classList.add("popup_is-animated");
  document.removeEventListener("keydown", closeModalEscape);
};

function closeModalOverlay(element){
  if (element.target === element.currentTarget) {
    closeModal(element.currentTarget);
  }
};

function closeModalEscape(element){
  if (element.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closeModal(currentPopup);
  }
};

export { openModal, closeModal, closeModalOverlay };
