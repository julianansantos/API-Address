import { User } from './User';

export interface UserForm {
  username: string;
  name: string;
  role: string;
  password: string;
  passwordConfirm: string;
}
