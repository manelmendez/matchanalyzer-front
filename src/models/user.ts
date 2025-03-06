export interface IUser {
  isLogged?: boolean;
  token?: string;
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  role: string;
  provider: string;
  provider_id?: string;
  password?: string;
  signupDate: Date;
  lastLogin: Date;
}
