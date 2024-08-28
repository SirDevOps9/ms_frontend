import { AccountNature } from "./account-nature";
import { GetBalanceDueDatesViewDto } from "./get-balance-due-dates-view-dto";

export interface GetCustomerOpeningDetailsViewDto {
    balance: number;
    balanceType: AccountNature;
    customerCode: string;
    customerName: string;
    createdOn: Date;
    balanceDueDates: GetBalanceDueDatesViewDto[];
  }
  