export interface IBaseResponse {
<<<<<<< HEAD
  _uuid: number;
  _created_at: string;
=======
  _created: number;
  _data_type: string;
  _is_deleted: boolean;
  _modified: number;
  _self_link: string;
  _user: string;
  _uuid: string;
}

export interface IGetAllResponse<T extends object> {
  items: T[];
}

export interface IWithUuid {
  _uuid: string;
>>>>>>> 6b1430efc1f0da104b0088e99e47d71cb10caf3f
}
