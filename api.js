
const host = "https://webdev-hw-api.vercel.app/api/v2/anton-sobachkin/comments";
export function getComms({
  token
}) {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (res === 401) {
      throw new Error("Нет авторизации");
    }
    return res.json();
  });
}

export function sendComm({
  text,
  token
}) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text,
      // "text": textInputElement.value,
      // "name": nameInputElement.value,
      //   forceError: true,
    }),
    headers: {
      Authorization: token,
    },
  });
}


//https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md
export function loginUser({
  login,
  password
}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400){
      throw new Error('неверный логин или пароль');
    }
    return response.json();
  });
}

export function regUser({
  login,
  password,
  name,
}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 400){
      throw new Error('пользователь с таким логином уже сущетсвует');
    }
    return response.json();
  });
}

export function addLike({ token, id }) {
  return fetch(`${host}/${id}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    return response.json();
  });
}