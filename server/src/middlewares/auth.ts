import User from '../models/user';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET';
import { UserAuthInfoRequest, JwtPayLoad } from '../@types';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const req2 = req as UserAuthInfoRequest;
  if (
    req2.headers.authorization === undefined ||
    !req2.headers.authorization.startsWith('Bearer')
  )
    return res
      .status(401)
      .send({ error: '401', message: 'Please login to view your map.' });

  //get token from header
  const token = req2.headers.authorization.split(' ')[1]; // ['Bearer, '.....token here...']

  try {
    const { _id } = jwt.verify(token, SECRET_KEY) as JwtPayLoad;
    //get user's details except password
    const user = await User.findById({ _id }).select('-password');
    if (!user)
      return res
        .status(401)
        .send({ error: '401', message: 'Please login to view your map.' });
    req2.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: '401', message: 'Not authorized' });
  }
}
