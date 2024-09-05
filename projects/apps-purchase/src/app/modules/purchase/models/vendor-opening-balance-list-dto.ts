import { AccountNature } from "projects/apps-accounting/src/app/modules/account/models";

export interface VendorOpeningBalanceListDto {
    id:number;
    OpeningBalanceJournalEntryCode: string;
    OpeningBalanceJournalEntryLineDescription: string;
    Amount: number;
    AmountNature: AccountNature;
  }