const { Router } = require('express');
const router = Router();

const { get, post, edit, destroy } = require('./controller/event');

router.get('/travker/:id', get);
router.post('/travker/:id', post);
router.put('/travker/:id', edit);
router.delete('/travker/:id', destroy);

module.exports = router;
