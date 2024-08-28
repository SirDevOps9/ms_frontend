import { AccountNature } from "./account-nature";
import { AddOpeningBalanceDueDatesDto } from "./add-opening-balance-due-dates-dto";

export interface AddCustomerOpeningBalanceDetailDto {
    id: number;
    customerId: number;
    balance: number;
    balanceType: AccountNature;
    dueDates?: AddOpeningBalanceDueDatesDto[];
  }