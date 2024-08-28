import { AccountNature } from "./account-nature";
import { GetCustomerOpeningDetailsDto } from "./get-customer-opening-details-dto";

export interface GetCustomerOpeningBalanceDto {
    openingBalanceJournalEntryLineId: number;
    openingBalanceJournalEntryId: number;
    openingBalanceJournalEntryCode: string;
    amount: number;
    amountNature: AccountNature;
    customerOpeningDetails: GetCustomerOpeningDetailsDto[];
  }
  

