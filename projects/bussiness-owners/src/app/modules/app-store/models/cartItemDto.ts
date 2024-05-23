import { Money } from 'shared-lib';

export interface CartItemDto {
  id: string;
  appName: string;
  appId: number;
  unitPrice: Money;
  subDomainName: string;
}
