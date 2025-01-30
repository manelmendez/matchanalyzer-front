export interface IUser {
  isLoged?: boolean;
  token?: string;
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  provider: string;
  provider_id?: string;
  password?: string;
  signupDate: Date;
  lastLogin: Date;
}