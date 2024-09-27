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
export class BankAccountViewDto {
    id: number;
    accountNumber: string;
    bankId: number;
    glAccountCode: string;
    glAccountName: string;
    iban: string;
    currencyName: string;
    currentBalance: number;
    openingBalance: number;
    userPermission?: string[];
    branches: string[];
}