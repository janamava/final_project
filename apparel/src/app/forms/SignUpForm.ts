import { ItemForm } from './ItemForm';

export interface SignUpForm {
  userUuId: string;
  username: string;
  password: string;
  matchingPassword: string;
  email: string;
  address?: string;
  authority: string;
  basket: ItemForm[];
}