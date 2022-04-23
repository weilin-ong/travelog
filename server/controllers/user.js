const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'SECRET';

//REGISTER USER
async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400)
        .send({ error: '400', message: 'Please include all fields' });
    }
    //if user exists
    const existedUser = await User.findOne({ email });
    if (existedUser)
      return res
        .status(409)
        .send({ error: '409', message: 'User already exists' });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const { _id } = await User.create({
      ...req.body,
      password: hash,
    });

    res.status(201).send({
      token: jwt.sign({ _id }, SECRET_KEY), //payload must be plain obj
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error:'400', message: 'Could not create user' });
  }
}

//LOGIN USER
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      error: '401',
      message: 'Username or password is incorrect',
    }); //unauthorized
  }
}

//LOGOUT USER
async function logout(req, res) {
  try {
    const data = req.body;
    res.status(201);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = { register, login, logout };
