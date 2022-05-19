import { Request } from 'express';

//user
export interface UserInterface {
  _id: string;
  email: string;
  password: string;
  username: string;
  pins: PinInterface[];
}

//pin
export interface PinInterface {
  place_id: string;
  place_name: string;
  lat: number;
  lng: number;
  rating: number;
  date: string;
  images?: string[];
  comment?: string;
}

//auth
export interface UserAuthInfoRequest extends Request {
  user: UserInterface;
}

export interface JwtPayLoad {
  _id: string;
}
