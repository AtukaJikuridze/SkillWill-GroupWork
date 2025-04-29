interface IResponse {
  _uuid: number;
  _created_at: string;
}

interface IAllUsers {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pid: number;
  phoneNumber: string;
  profileImage?: string;
  role: "admin" | "user" | "courier";
}

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

// User
export interface IBaseUser extends IAllUsers {
  coordinates: {
    lat: string | null;
    lng: string | null;
  };
  requestedCouriers: ICourier[];
}
export interface IUser extends IResponse, IBaseUser {}

// Courier
export type IWeekDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface IWorkingDay {
  startHours: string;
  endHours: string;
  booked: boolean;
}

export interface IWorkingDays {
  [key: string]: IWorkingDay[];
}

export interface IBaseCourier extends IAllUsers {
  vehicle: string;
  workingDays: IWorkingDays;
  totalRequests: string[];
}
export interface ICourier extends IBaseCourier, IResponse {}

// Admin
export interface IBaseAdmin extends IAllUsers {}
export interface IAdmin extends IBaseAdmin, IResponse {}

// All
export type IRandomUser = IUser | ICourier | IAdmin;
