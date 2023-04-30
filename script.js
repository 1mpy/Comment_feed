
import {
  getComms
} from "./api.js";
import {
  sendComm
} from "./api.js";
import {
  renderLogin
} from "./components/login-component.js";
import { format } from "date-fns";
let comments = [];
let user = null;
let token = null;
const codeAdjust = (token) => {
  return getComms({
    token
  }).then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
        id: comment.id,
      };
    });
    comments = appComments;
    renderComments();
  });
};
codeAdjust();
const renderComments = () => {
  const appEl = document.getElementById('app');
  //  if (!token) { 
  //   renderLogin({
  //     appEl,
  //     setToken: (newToken) => {
  //       token = newToken;
  //     },
  //     setUser: (newUser) => {
  //       user = newUser;
  //     },
  //     codeAdjust,
  //   });
  //   return;
  // }
  const commentsHtml = comments.map((comment, index) => {
    const createDate = format(new Date(comment.date), 'yyyy-mm-dd hh.mm.ss');
    return `<li class="comment">
    <div class="comment-header">
      <div class="comment-name">${comment.name} </div>
      <div>${createDate}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text" >
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likes}</span>      
        <button class="like-button ${comment.isLiked}" data-like="${index}"></button>
      </div>
    </div>
  </li>`;
  }).join('');


  const appHtml = `  
  <div class="container">
      <ul class="comments" id="list">
      ${commentsHtml}
    </ul>
    ${token ? `<div class="add-form">
      <input type="text" class="add-form-name" placeholder="Введите имя" id="name-input" disabled value="${user.name}"/>
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="text-input" ></textarea>
      <div class="add-form-row">
        <button class="add-form-button turn-off" id="add-button">Написать</button>
      </div>

    </div>
  </div>`: `<p>Чтобы добавить комментарий, <a class="check" id="auth">авторизуйтесь</a></p>`}`;

  appEl.innerHTML = appHtml;

  if (!token) {

    document.getElementById("auth").addEventListener('click', () => {
      renderLogin({
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
        setUser: (newUser) => {
                user = newUser;
              },
        codeAdjust
      });
    });
    return;
  }

  const buttonElement = document.getElementById("add-button");
  const textInputElement = document.getElementById("text-input");
  const nameInputElement = document.getElementById('name-input');
  nameInputElement.value = user.name;


  //Добавление комментария

  buttonElement.addEventListener("click", () => {
    if (textInputElement.value === "") {
      return;
    }
    buttonElement.disabled = true;
    buttonElement.textContent = "Элемент добавлятся...";
    sendComm({
      "text": textInputElement.value,
      // text,
      token
    })
    .then(() => {
      return codeAdjust();
    });
  });

  // Обновление по кнопке
  function addNewElement() {
    buttonElement.addEventListener('click', () => {
      codeAdjust();
    });
  }
  addNewElement();

};
codeAdjust();
