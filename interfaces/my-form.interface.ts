import { InputFieldsProps } from "./login-form-fields.interface";

export interface IForm {
  inputFields: InputFieldsProps[];
  myAction: any;
  isPending: boolean;
  filePicture?: string | null;
}
