import { JournalTemplateType } from "./journalentrytemplatetype";

export class GetJournalTemplateDto{
    id:string;
    code:string;
    PeriodId:string;
    Description:string;
    totalDebitAmountLocal : number;
    totalCreditAmountLocal : number;
    GetJournalTemplateLinesByIdDto :GetJournalTemplateLinesDto[];
}


export class GetJournalTemplateLinesDto{
    id:string;
    LineDescription :string;
    DebitAmount : number;
    CreditAmount : number;
    CurrencyRate : number;
    DebitAmountLocal : number;
    CreditAmountLocal : number;
    AccountId :number;
    CurrencyId :number;
    PartnerId :number;
}