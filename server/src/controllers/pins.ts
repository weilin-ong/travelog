import User from '../models/user';
import { Response, Request } from 'express';
import { UserAuthInfoRequest } from '../@types';

//GET USER'S PINS
export async function getPins(req: Request, res: Response) {
  const req2 = req as UserAuthInfoRequest;
  try {
    res.status(200);
    res.json({ pins: req2.user.pins, username: req2.user.username });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: '500', message: 'Could not get pins' });
  }
}

//ADD A PIN
export async function addPin(req: Request, res: Response) {
  const req2 = req as UserAuthInfoRequest;
  try {
    const { place_id, place_name, date, rating, lat, lng } = req2.body;

    //if pin exists
    if (
      req2.user.pins !== undefined &&
      req2.user.pins.find((pin) => pin.place_id === place_id)
    ) {
      return res.status(400).send({ error: '400', message: 'Pin existed' });
    }

    //validation (except images and comment)
    if (!place_id || !place_name || !date || !rating || !lat || !lng) {
      return res
        .status(400)
        .send({ error: '400', message: 'Please include all fields' });
    }
    const newPins = [...req2.user.pins, req2.body];
    await User.findByIdAndUpdate(
      req2.user._id,
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
export async function editPin(req: Request, res: Response) {
  const req2 = req as UserAuthInfoRequest;
  try {
    const { place_id, place_name, date, rating, lat, lng } = req2.body;

    //if pin not found
    if (!req2.user.pins.find((pin) => pin.place_id === place_id)) {
      return res.status(400).send({ error: '400', message: 'Pin not found' });
    }

    //validation
    if (!place_id || !place_name || !date || !rating || !lat || !lng) {
      return res
        .status(400)
        .send({ error: '400', message: 'Please include all fields' });
    }

    const newPins = req2.user.pins.filter((pin) => pin.place_id !== place_id);

    await User.findByIdAndUpdate(
      req2.user._id,
      { pins: [...newPins, req2.body] },
      { new: true }
    );
    // const data = await User.findById(req2.user._id).select('-email -password');
    res.status(201).json(req2.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

//REMOVE A PIN
export async function removePin(req: Request, res: Response) {
  const req2 = req as UserAuthInfoRequest;
  const { place_id } = req.body;

  //if pin not found
  if (!req2.user.pins.find((pin) => pin.place_id === place_id)) {
    return res.status(400).send({ error: '400', message: 'Pin not found' });
  }

  try {
    const newPins = req2.user.pins.filter((pin) => pin.place_id !== place_id);
    await User.findByIdAndUpdate(
      req2.user._id,
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

// export = { addPin, getPins, editPin, removePin };
