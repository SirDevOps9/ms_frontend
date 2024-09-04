import { AccountNature } from "./account-nature";

export interface GetVendorOpeningDetailsViewDto {
    balance: number;
    balanceType: AccountNature;
    vendorCode: string;
    vendorName: string;
    createdOn: Date;
    balanceDueDates: GetBalanceDueDatesViewDto[];
  }

  export interface GetBalanceDueDatesViewDto {
    debit: number;
    credit: number;
    dueDate: Date;
  }