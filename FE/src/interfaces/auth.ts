export interface IAuth {
  _id?: string | number;
  id?: string | number;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  gender?: string;
  displayName?: string;
  address?: string;
  avatar?: string;
  isActive?: boolean;
  createdAt?: string | number;
  confirmPassword?: string;
  user?: any;
  columns?: any;
}
