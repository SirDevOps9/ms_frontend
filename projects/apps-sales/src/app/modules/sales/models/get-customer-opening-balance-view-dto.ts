import { AccountNature } from "./account-nature";
import { GetCustomerOpeningDetailsViewDto } from "./get-customer-opening-details-view-dto";

export interface GetCustomerOpeningBalanceViewDto {
    journalEntryLineDescription: number;
    openingBalanceJournalEntryCode: number;
    amount: number;
    amountNature: AccountNature;
    customerOpeningDetails: GetCustomerOpeningDetailsViewDto[];
  }
  

