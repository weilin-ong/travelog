const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET';

async function authMiddleware(req, res, next) {
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith('Bearer')
  )
    res.sendStatus(401);

  const token = req.headers.authorization.split(' ')[1]; // ['Bearer, '.....token here...']

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = User.findById({ _id }).select('-password');
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: '401', message: 'Not authorized' });
  }
}

module.exports = { authMiddleware };
