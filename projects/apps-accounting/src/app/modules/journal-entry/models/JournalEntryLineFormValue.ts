import { AccountDto } from "../../account/models";
import { costCenters } from "./costCenters";

export class JournalEntryLineFormValue {
    id: number;
    account: AccountDto;
    lineDescription: string;
    debitAmount: number;
    creditAmount: number;
    currency: number;
    currencyRate: number;
    debitAmountLocal: number;
    creditAmountLocal: number;
    costCenters: costCenters[];
}