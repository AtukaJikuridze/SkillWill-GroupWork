export default interface ILoginForm {
  errors: {
    email?: string[];
    password?: string[];
  };
  values: {
    email: string;
    password: string;
  };
  success?: boolean;
}
