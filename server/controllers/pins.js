//REGISTER USER
async function getPins(req, res) {
  try {
    console.log('getPins');
    const data = req.body;
    res.status(200);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
}

//REGISTER USER
async function addPin(req, res) {
  try {
    console.log('addPin');
    const data = req.body;
    res.status(201);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
}

//LOGIN USER
async function editPin(req, res) {
  try {
    console.log('editPin');
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
async function removePin(req, res) {
  try {
    console.log('removePin');
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
