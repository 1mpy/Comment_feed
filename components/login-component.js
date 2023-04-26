import {
  loginUser,
  regUser
} from "../api.js";
export function renderLogin({  appEl,  setToken, setUser,  codeAdjust }) {
  let isLoginMode = true;

  const renderForm = () => {
    const appHtml = `  
    <div class="regbox" class="reg-form" >
    <h3  class="reg-title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
    <div class="reg-form">
    ${
      isLoginMode ? '' : `      
        
        <input type="text" id="name-input"  class="reg-form-name" placeholder="Имя"/>
        <br>`}
      
      <input type="text" id="login-input"  class="reg-form-login" placeholder="Логин"/>
      <br/>
      
      <input type="password" id="password-input"  class="reg-form-pass" placeholder="Пароль"/>
    </div>
    <br/>
    <button  class="reg-form-button" id="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>

    <br/><br/><br/>
    <button class="enter-button" id="toggle-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
    </div>
    `;

  appEl.innerHTML = appHtml;

  document.getElementById('login-button').addEventListener('click', () => {
    if(isLoginMode) {
      const login = document.getElementById('login-input').value;
      const password = document.getElementById('password-input').value;
      if (!login) {
        alert('введите логин');
        return;
      }
      if (!password) {
        alert('введите пароль');
        return;
      }
      loginUser({
        login: login,
        password: password,
      }).then((user) => {
        setToken(`Bearer ${user.user.token}`);
        setUser(user.user);
        codeAdjust();
      }).catch(error => {
        alert(error.message);
      });
    }else{
      // alert('Введите необходимые данные');
      const login = document.getElementById('login-input').value;
      let name = document.getElementById('name-input').value;

      const password = document.getElementById('password-input').value;
      if (!name) {
        alert('введите имя');
        return;
      }
      if (!login) {
        alert('введите логин');
        return;
      }
      if (!password) {
        alert('введите пароль');
        return;
      }
      regUser({
        login: login,
        password: password,
        name: name,
      }).then((user) => {
        setToken(`Bearer ${user.user.token}`);
        setUser(user.user);
        codeAdjust();
      }).catch(error => {
        alert(error.message);
      });
    }

  });

  document.getElementById('toggle-button').addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    renderForm();
  });
  };

  renderForm();

}

