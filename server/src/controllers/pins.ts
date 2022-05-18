import User from '../models/user';
import { UserInterface } from '../@types/index';

//GET USER'S PINS
async function getPins(req: Request, res: Response) {
  try {
    res.status(200);
    res.json({ pins: req.user.pins, username: req.user.username }: UserInterface);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: '500', message: 'Could not get pins' });
  }
}

//ADD A PIN
async function addPin(req: Request, res: Response) {
  try {
    const { place_id, place_name, date, rating, lat, lng } = req.body;

    //if pin exists
    if (req.user.pins.find((pin) => pin.place_id === place_id)) {
      return res.status(400).send({ error: '400', message: 'Pin existed' });
    }

    //validation (except images and comment)
    if (!place_id || !place_name || !date || !rating || !lat || !lng) {
      return res
        .status(400)
        .send({ error: '400', message: 'Please include all fields' });
    }
    const newPins = [...req.user.pins, req.body];
    await User.findByIdAndUpdate(
      req.user._id,
      { pins: newPins },
      { new: true }
    );
    // const data = await User.findById(req.user._id).select('pins');
    res.status(201).json(req.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

//EDIT A PIN
async function editPin(req: Request, res: Response) {
  try {
    const { place_id, place_name, date, rating, lat, lng } = req.body;

    //if pin not found
    if (!req.user.pins.find((pin) => pin.place_id === place_id)) {
      return res.status(400).send({ error: '400', message: 'Pin not found' });
    }

    //validation
    if (!place_id || !place_name || !date || !rating || !lat || !lng) {
      return res
        .status(400)
        .send({ error: '400', message: 'Please include all fields' });
    }

    const newPins = req.user.pins.filter((pin) => pin.place_id !== place_id);

    await User.findByIdAndUpdate(
      req.user._id,
      { pins: [...newPins, req.body] },
      { new: true }
    );
    // const data = await User.findById(req.user._id).select('-email -password');
    res.status(201).json(req.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

//REMOVE A PIN
async function removePin(req: Request, res: Response) {
  const { place_id } = req.body;

  //if pin not found
  if (!req.user.pins.find((pin) => pin.place_id === place_id)) {
    return res.status(400).send({ error: '400', message: 'Pin not found' });
  }

  try {
    const newPins = req.user.pins.filter((pin) => pin.place_id !== place_id);
    await User.findByIdAndUpdate(
      req.user._id,
      { pins: newPins },
      { new: true }
    );
    //const data = await User.findById(req.user._id).select('-email -password');
    res.status(201).json(req.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default { addPin, getPins, editPin, removePin };
