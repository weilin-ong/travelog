const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

//register
export function register(user) {
  return fetch(`${baseURL}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

//login
export function login(user) {
  return fetch(`${baseURL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

//logout
export function logout(token) {
  localStorage.removeItem(token);
}

//get pins
export function getPins(token) {
  return fetch(`${baseURL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

//add pin
export function addPin(token, pin) {
  return fetch(`${baseURL}/add`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pin),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

//edit pin
export function editPin(token, pin) {
  return fetch(`${baseURL}/edit`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pin),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

//delete pin
export function deletePin(token, pin) {
  return fetch(`${baseURL}/remove`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pin),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
