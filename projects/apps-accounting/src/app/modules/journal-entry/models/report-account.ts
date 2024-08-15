import { reportJurnalAccountDto } from ".";

export class reportAccount {
    accountCode: string;
    accountName: string;
    nature: string;
    journalEntryDtos: reportJurnalAccountDto[];
    totalDebitAmount:number;
    totalCreditAmount:number;
  }
    
