(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),document.removeEventListener("keydown",r)}function n(e){e.target===e.currentTarget&&t(e.currentTarget)}function r(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var o={urlServer:"https://nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"e0abe54b-7010-4528-8ad0-c2c4823663fc","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},u=document.querySelector("#card-template").content,i=document.querySelector(".popup_type_confirm");function a(e,t){var n=document.querySelector('[data-card-id="'+t+'"]').querySelector(".card__like-count");e.target.classList.contains("card__like-button_is-active")?function(e){return fetch(o.urlServer+"/cards/likes/"+e,{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))}(t).then((function(t){e.target.classList.remove("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch(o.urlServer+"/cards/likes/"+e,{method:"PUT",headers:o.headers}).then((function(e){return c(e)}))}(t).then((function(t){e.target.classList.add("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}function s(t){e(i),i.dataset.cardId=t}var l,d=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))},f=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){d(e,n,t.inputErrorClass,t.errorClass),n.setCustomValidity("")})),e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass)},_=document.querySelector(".places__list"),m=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),q=document.forms["edit-profile"],b=document.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_new-card"),k=document.forms["new-place"],E=document.querySelector(".popup_type_image"),g=document.querySelector(".popup__image"),C=document.querySelector(".popup__caption"),x=document.querySelectorAll(".popup"),A=document.querySelector(".popup_type_avatar"),T=document.forms["edit-avatar"],w=document.querySelector(".profile__image-box"),B=document.querySelector(".popup_type_confirm"),D=B.querySelector(".popup__button"),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},P=function(e,t){return t.textContent=e?"Сохранение...":"Сохранить"},N=function(e){y.textContent=e.name,h.textContent=e.about,S.style.backgroundImage="url(".concat(e.avatar,")")},O=function(t,n,r){g.src=t,g.alt=n,C.textContent=r,e(E)},j=function(e,t,n,r,o){var c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"end",i=function(e,t,n,r,o){var c=u.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__title"),a=c.querySelector(".card__image"),s=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-count");return c.dataset.cardId=e._id,c.dataset.ownerId=e.owner._id,i.textContent=e.name,a.src=e.link,a.alt=e.description,d.textContent=e.likes.length,e.likes.some((function(e){return e._id===o}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(t){return n(t,e._id)})),e.owner._id===o?s.addEventListener("click",(function(){return t(e._id)})):s.remove(),a.addEventListener("click",(function(){r(a.src,a.alt,i.textContent)})),c}(e,r,n,o,arguments.length>6?arguments[6]:void 0);return"end"===c?t.append(i):t.prepend(i)};E.addEventListener("click",(function(e){return n(e)})),m.addEventListener("click",(function(){var t,n,r;f(q,I),t=q,n=y.textContent,r=h.textContent,t.elements.name.value=n,t.elements.description.value=r,e(v)})),q.addEventListener("submit",(function(e){var n,r;e.preventDefault(),P(!0,q.querySelector(".popup__button")),(n=q.name.value,r=q.description.value,fetch(o.urlServer+"/users/me",{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return c(e)}))).then((function(e){N(e),t(v),f(q,I)})).catch((function(e){return console.log(e)})).finally((function(){P(!1,q.querySelector(".popup__button"))}))})),v.addEventListener("click",(function(e){return n(e)})),w.addEventListener("click",(function(t){f(T,I),T.reset(),e(A)})),T.addEventListener("submit",(function(e){var n;e.preventDefault(),P(!0,T.querySelector(".popup__button")),(n=T.link.value,fetch(o.urlServer+"/users/me/avatar",{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})}).then((function(e){return c(e)}))).then((function(e){N(e),t(A),f(T,I)})).catch((function(e){return console.log(e)})).finally((function(){return P(!1,T.querySelector(".popup__button"))}))})),A.addEventListener("click",(function(e){return n(e)})),b.addEventListener("click",(function(){k.reset(),f(k,I),e(L)})),k.addEventListener("submit",(function(e){e.preventDefault();var n=k.elements["place-name"].value,r=k.elements.link.value;P(!0,k.querySelector(".popup__button")),function(e,t){return fetch(o.urlServer+"/cards",{method:"POST",headers:o.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return c(e)}))}(n,r).then((function(e){j(e,_,a,s,O,"begin",l),t(L),k.reset(),f(k,I)})).catch((function(e){return console.log(e)})).finally((function(){P(!1,k.querySelector(".popup__button"))}))})),L.addEventListener("click",(function(e){return n(e)})),B.addEventListener("click",(function(e){return n(e)})),D.addEventListener("click",(function(){var e;(e=B.dataset.cardId,fetch(o.urlServer+"/cards/"+e,{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(){document.querySelector('[data-card-id="'.concat(B.dataset.cardId,'"]')).remove(),t(B)})).catch((function(e){return console.log(e)}))})),x.forEach((function(e){e.addEventListener("click",(function(n){n.target.classList.contains("popup__close")&&t(e)}))})),Promise.all([fetch(o.urlServer+"/users/me",{headers:o.headers}).then((function(e){return c(e)})),fetch(o.urlServer+"/cards",{headers:o.headers}).then((function(e){return c(e)}))]).then((function(e){l=e[0]._id,N(e[0]),function(e,t){e.forEach((function(e){j(e,_,a,s,O,"begin",t)}))}(e[1],e[0]._id)})).catch((function(e){return console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n,r,o,c,u,i,a,s;t.addEventListener("submit",(function(e){return e.preventDefault()})),n=t,r=e.inputSelector,o=e.inputErrorClass,c=e.errorClass,u=e.submitButtonSelector,i=e.inactiveButtonClass,a=Array.from(n.querySelectorAll(r)),s=n.querySelector(u),p(a,s,i),a.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),c.classList.add(r),c.textContent=o}(e,t,n,r,t.validationMessage)}(n,e,o,c),p(a,s,i)}))}))}))}(I)})();