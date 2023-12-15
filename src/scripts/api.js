// server, request-headers, token
const config = {
 urlServer: "https://nomoreparties.co/v1/wff-cohort-2",
 headers: {
            authorization: "e0abe54b-7010-4528-8ad0-c2c4823663fc",
            "Content-Type": "application/json"
          }
};

// functions

// получение ответа и передача его методу json(массив объектов) или перевод промиса в состояние ошибки
const getResponseStatus = res => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// запрос на сервер для получения объекта c данными карточки
const getInitialCards = () => {
  return fetch(config.urlServer + "/cards", {
    headers: config.headers
  }).then(res => getResponseStatus(res));
};

// запрос на сервер для получения объекта с данными пользователя
const getUserData = () => {
  return fetch(config.urlServer + "/users/me", {
    headers: config.headers
  }).then(res => getResponseStatus(res));
};

// параллельный запуск промисов
const getInitialData = () => {
  return Promise.all([getUserData(), getInitialCards()]);
};

// обновление аватара
const patchAvatar = (avatar) => {
  return fetch(config.urlServer + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar })
  }).then(res => getResponseStatus(res));
};

// обновление профиля пользователя
const patchUserProfile = (name, about) => {
  return fetch(config.urlServer + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(res => getResponseStatus(res));
};

// отправка на сервер данных новой карточки
const postNewCard = (name, link) => {
  return fetch(config.urlServer + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(res => getResponseStatus(res));
};

// постановка лайка
const likeIt = (cardId) => {
  return fetch(config.urlServer + "/cards/likes/" + cardId, {
    method: "PUT",
    headers: config.headers
  }).then(res => getResponseStatus(res));
};

// снятие лайка
const deleteLike = (cardId) => {
  return fetch(config.urlServer + "/cards/likes/" + cardId, {
    method: "DELETE",
    headers: config.headers
  }).then(res => getResponseStatus(res));
};

// удаление карточки
const deleteCardServer = (cardId) => {
  return fetch(config.urlServer + "/cards/" + cardId, {
    method: "DELETE",
    headers: config.headers
  }).then(res => getResponseStatus(res));
};

// exports
export { 
  getInitialData, patchUserProfile, postNewCard, likeIt, deleteLike, deleteCardServer, patchAvatar
};
