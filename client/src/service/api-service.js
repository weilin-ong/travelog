const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

function apiHelper(method, route, headers, body) {
  return fetch(`${baseURL}/${route}`, {
    method: method,
    credentials: 'include',
    mode: 'cors',
    headers: headers,
    body: body,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const headers = { 'Content-Type': 'application/json' };
const headersAuth = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});
const body = (data) => JSON.stringify(data);

//register
export function register(user) {
  return apiHelper('POST', 'register', headers, body(user));
}

//login
export function login(user) {
  return apiHelper('POST', 'login', headers, body(user));
}

//logout
export function logout(token) {
  localStorage.removeItem(token);
}

//get pins
export function getPins(token) {
  return apiHelper('GET', 'me', headersAuth(token));
}

//add pin
export function addPin(token, pin) {
  return apiHelper('POST', 'add', headersAuth(token), body(pin));
}

//edit pin
export function editPin(token, pin) {
  return apiHelper('PUT', 'edit', headersAuth(token), body(pin));
}

//delete pin
export function deletePin(token, pin) {
  return apiHelper('DELETE', 'remove', headersAuth(token), body(pin));
}
