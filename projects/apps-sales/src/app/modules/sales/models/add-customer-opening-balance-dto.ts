import { AccountNature } from "./account-nature";
import { AddCustomerOpeningBalanceDetailDto } from "./add-customer-opening-balance-detail-dto";

export interface AddCustomerOpeningBalanceDto {
    openingBalanceJournalEntryLineId: number;
    amountNature: AccountNature;
    customerOpeningBalanceDetails: AddCustomerOpeningBalanceDetailDto[];
  }
  

  
