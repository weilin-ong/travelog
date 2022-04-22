const { Router } = require('express');
const router = Router();

const { register, login, logout } = require('./controller/user');

const { addPin, editPin, removePin, getPins } = require('./controller/pins');

//user's authentication
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

//user's pin
router.get('/pins', getPins);
router.post('/add', addPin);
router.put('/edit', editPin);
router.delete('/remove', removePin);

module.exports = router;
