import { BankAccountViewDto } from "./bank-account-view-dto";

export class ViewBankDto {
    id:number
    code:string;
	shortName :string;
	contactName :string;
	phone :string;
	name :string;
	bankAddress :string;
	bankEmail :string;
	fax :string;
	bankAccounts :BankAccountViewDto[];
}
