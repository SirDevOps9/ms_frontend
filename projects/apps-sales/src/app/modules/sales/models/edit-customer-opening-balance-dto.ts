import { AccountNature } from "./account-nature";
import { EditCustomerOpeningBalanceDetailDto } from "./edit-customer-opening-balance-detail-dto";


export interface EditCustomerOpeningBalanceDto {
  openingBalanceJournalEntryLineId: number;
  amountNature: AccountNature;
  customerOpeningBalanceDetails: EditCustomerOpeningBalanceDetailDto[];
}
