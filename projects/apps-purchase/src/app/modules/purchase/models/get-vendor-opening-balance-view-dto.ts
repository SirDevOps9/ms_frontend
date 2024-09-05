import { AccountNature } from "./account-nature";
import { GetVendorOpeningDetailsViewDto } from "./get-vendor-opining-balance-Detail-view-dto";

export interface GetVendorOpeningBalanceViewDto {
    journalEntryLineDescription: number;
    openingBalanceJournalEntryCode: number;
    amount: number;
    amountNature: AccountNature;
    vendorOpeningDetails: GetVendorOpeningDetailsViewDto[];
  }