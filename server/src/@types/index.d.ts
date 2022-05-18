export interface UserInterface {
  email: string;
  password: string;
  username: string;
  pins?: PinInterface[];
}

interface PinInterface {
  place_id: string;
  place_name: string;
  lat: number;
  lng: number;
  rating: number;
  date: string;
  images?: string[];
  comment?: string;
}
