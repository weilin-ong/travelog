import User from '../models/user';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET';

async function authMiddleware(req, res, next) {
  if (
    !req.headers.authorization &&
    !req.headers.authorization.startsWith('Bearer')
  )
    return res
      .status(401)
      .send({ error: '401', message: 'Please login to view your map.' });

  //get token from header
  const token = req.headers.authorization.split(' ')[1]; // ['Bearer, '.....token here...']

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    //get user's details except password
    const user = await User.findById({ _id }).select('-password');
    if (!user)
      return res
        .status(401)
        .send({ error: '401', message: 'Please login to view your map.' });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: '401', message: 'Not authorized' });
  }
}

export default { authMiddleware };
