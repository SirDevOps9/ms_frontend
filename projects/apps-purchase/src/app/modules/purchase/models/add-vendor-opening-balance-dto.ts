import { AccountNature } from "projects/apps-accounting/src/app/modules/account/models";

export interface AddVendorOpeningBalanceDto {
    OpeningBalanceJournalEntryLineId: string;
    AmountNature: AccountNature;
    VendorOpeningBalanceDetails:VendorOpeningBalanceDetailsDto[];
  }

  export interface VendorOpeningBalanceDetailsDto {
    id: number;
    Balance: number[];
    BalanceType:string;
    DueDates:VendorOpeningBalanceDueDatesDto[];
  }

  export interface VendorOpeningBalanceDueDatesDto {
    id: number;
    Debit: number;
    Credit:number;
    DueDate:Date;
  }