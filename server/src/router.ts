import { Router } from 'express';
const router = Router();

const { register, login } = require('./controllers/user');
const { addPin, editPin, removePin, getPins } = require('./controllers/pins');

const { authMiddleware } = require('./middlewares/auth');

//user's authentication
router.post('/register', register);
router.post('/login', login);

//user's pin
router.get('/me', authMiddleware, getPins);
router.post('/add', authMiddleware, addPin);
router.put('/edit', authMiddleware, editPin);
router.delete('/remove', authMiddleware, removePin);

export default router;
