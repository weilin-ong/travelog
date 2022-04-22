const User = require('../models/user');

//GET USER'S PINS
async function getPins(req, res) {
  try {
    
    const data = req.body;
    res.status(200);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
}

//ADD A PIN
async function addPin(req, res) {
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

//EDIT A PIN
async function editPin(req, res) {
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

//REMOVE A PIN
async function removePin(req, res) {
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

module.exports = { addPin, getPins, editPin, removePin };
