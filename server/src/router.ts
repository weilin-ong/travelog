import { Router } from 'express';
const router = Router();

import { register, login } from './controllers/user';
import { addPin, editPin, removePin, getPins } from './controllers/pins';

import { authMiddleware } from './middlewares/auth';

//user's authentication
router.post('/register', register);
router.post('/login', login);

//user's pin
router.get('/me', authMiddleware, getPins);
router.post('/add', authMiddleware, addPin);
router.put('/edit', authMiddleware, editPin);
router.delete('/remove', authMiddleware, removePin);

export default router;
