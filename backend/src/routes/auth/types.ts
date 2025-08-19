import { SafeUser } from '../user/types';

export interface LoginBody {
  login: string,
  password: string
}

export interface RegisterBody extends LoginBody {
  email: string,
}
