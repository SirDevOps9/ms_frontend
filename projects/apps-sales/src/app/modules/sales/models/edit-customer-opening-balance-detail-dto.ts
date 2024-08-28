import { AccountNature } from "./account-nature";
import { EditOpeningBalanceDueDatesDto } from "./edit-opening-balance-due-dates-dto";



export interface EditCustomerOpeningBalanceDetailDto {
    id: number;
    customerId: number;
    balance: number;
    balanceType: AccountNature;
    dueDates?: EditOpeningBalanceDueDatesDto[];
  }