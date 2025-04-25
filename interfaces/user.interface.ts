import { IAdmin } from "./admin.interface copy";
import { ICourier } from "./courier.interface";
import { IBaseResponse } from "./response.interface";

export interface IAdress {
  lng: string;
  lat: string;
}

export interface IBaseUser {
  _uuid: string;
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

// axla es typebi gvaq 
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
