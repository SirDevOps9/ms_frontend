import { AccountNature } from "./account-nature";
import { VendorOpeningBalanceDetailsDto } from "./add-vendor-opening-balance-dto";

export interface getVendorOpeningBalanceByID {
    OpeningBalanceJournalEntryLineId: number;
    openingBalanceJournalEntryId: number,
    AmountNature: AccountNature;
    VendorOpeningBalanceDetails:VendorOpeningBalanceDetailsDto[];
  }
