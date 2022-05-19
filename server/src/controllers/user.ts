import bcrypt from 'bcryptjs';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserInterface } from '../@types';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET';

//REGISTER USER
export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body as UserInterface;

    //validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: '400', message: 'Please include all fields' });
    }
    //if user exists
    const existedUser = (await User.findOne({ email })) as UserInterface;
    if (existedUser)
      return res
        .status(409)
        .json({ error: '409', message: 'User already exists' });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //create new user
    const user = (await User.create({
      ...req.body,
      password: hash,
    })) as UserInterface;

    //if successfully created user
    if (user) {
      return res.status(201).json({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '30d' }), //payload must be plain obj
        username: user.username,
      });
    } else {
      return res
        .status(400)
        .json({ error: '400', message: 'Could not create user' });
    }
  } catch (error: any) {
    console.log(error);
    return res.sendStatus(500);
  }
}

//LOGIN USER
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as UserInterface;

    //if user exists and passwords match
    const user = (await User.findOne({ email })) as UserInterface;
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(201).send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '30d' }),
        username: user.username,
      });
    } else {
      return res.status(401).send({
        error: '401',
        message: 'Invalid credentials',
      }); //unauthorized
    }
  } catch (error: any) {
    console.log(error);
    return res.sendStatus(500);
  }
}
