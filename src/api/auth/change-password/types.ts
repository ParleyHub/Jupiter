export interface IChangePasswordType {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IChangePasswordResponseType {
  message: string;
}
