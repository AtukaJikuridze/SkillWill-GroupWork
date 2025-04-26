import { IAdmin } from "./admin.interface copy";
import { ICourier } from "./courier.interface";
import { IBaseResponse } from "./response.interface";

export interface IAdress {
  lng: string;
  lat: string;
}

export interface IBaseUser {
<<<<<<< HEAD
=======
  _uuid: string;
>>>>>>> 6b1430efc1f0da104b0088e99e47d71cb10caf3f
  firstName: string;
  lastName: string;
  pid: number;
  phoneNumber: string;
  email: string;
  password: string;
  profileImage: string;
  role: "admin" | "user" | "courier";
  address: IAdress;
  requestedCouriers: ICourier[];
}

<<<<<<< HEAD
// axla es typebi gvaq
=======
// axla es typebi gvaq 
>>>>>>> 6b1430efc1f0da104b0088e99e47d71cb10caf3f
export interface IUserTypes {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone_number: number;
  personal_id: number;
  coordinates: {
    lat: string | null;
    lng: string | null;
  };
}

export interface IUser extends IBaseResponse, IBaseUser {}
export type IRandomUser = IUser | IAdmin | ICourier;
