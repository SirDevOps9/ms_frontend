import { AccountNature } from "./account-nature";
import { GetBalanceDueDatesDto } from "./get-balance-due-dates-dto";

export interface GetCustomerOpeningDetailsDto {
    id: number;
    balance: number;
    balanceType: AccountNature;
    customerId: number;
    customerCode: string;
    customerName: string;
    createdOn: Date;
    balanceDueDates: GetBalanceDueDatesDto[];
  }
  