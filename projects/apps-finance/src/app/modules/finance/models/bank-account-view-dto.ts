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