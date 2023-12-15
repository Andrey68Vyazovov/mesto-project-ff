// добавление input и span error-стилей
const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};
// отображение span, если валидация поля false
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};
// установка и отображение кастомного сообщения об ошибке при валидации input регулярным выражением
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};
// поиск input-полей формы не прошедших валидацию
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};
// функция смены состояния и блокировки submit-кнопки 
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};
// установка слушателей на input-элементы форм
const formEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
// функция включения валидации элементов форм и отмена стандартного поведения при событии submit
const enableValidation = (validationConfig) => {
  const formSet = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formSet.forEach((form) => {
    form.addEventListener("submit", evt => evt.preventDefault());
    formEventListeners(
      form,
      validationConfig.inputSelector,
      validationConfig.inputErrorClass,
      validationConfig.errorClass,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass
    );
  });
};
// функция очистки валидации формы и активации submit-кнопок
const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
    inputElement.setCustomValidity("");
  });
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};
// экспорт функций
export { enableValidation, clearValidation };
