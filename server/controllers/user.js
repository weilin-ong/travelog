const User = require('../models/user');

//REGISTER USER
async function register(req, res) {
  try {
    const data = await User.create(req.body);
    res.status(201);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
}

//LOGIN USER
async function login(req, res) {
  try {
    const data = req.body;
    res.status(201);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
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
    res.status(500);
    res.end();
  }
}

module.exports = { register, login, logout };
