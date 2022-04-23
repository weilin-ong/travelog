const { Router } = require('express');
const router = Router();

const { register, login, logout } = require('./controllers/user');
const { addPin, editPin, removePin, getPins } = require('./controllers/pins');

const { authMiddleware } = require('./middlewares/auth');

//user's authentication
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

//user's pin
router.get('/me', authMiddleware, getPins);
router.post('/add', authMiddleware, addPin);
router.put('/edit', authMiddleware, editPin);
router.delete('/remove', authMiddleware, removePin);

module.exports = router;
