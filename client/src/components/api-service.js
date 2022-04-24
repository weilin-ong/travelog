const baseURL = process.env.SERVER_BASE_URL;

//register
export function register(user) {
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
  return fetch(`${baseURL}/logout`, {
    method: 'POST',
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

//get pins
export function getPins(token) {
  return fetch(`${baseURL}/login`, {
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
  return fetch(`${baseURL}/login`, {
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
  return fetch(`${baseURL}/login`, {
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
  return fetch(`${baseURL}/login`, {
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
