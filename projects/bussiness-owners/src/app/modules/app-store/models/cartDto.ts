import { Money } from 'shared-lib';
import { CartItemDto } from './cartItemDto';

export interface CartDto {
  id: string;
  total: Money;
  items: CartItemDto[];
}
