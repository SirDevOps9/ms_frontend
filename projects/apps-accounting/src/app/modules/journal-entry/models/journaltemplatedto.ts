import { JournalTemplateType } from "./journalentrytemplatetype";

export class GetAllJournalTemplateDto{
    id:string;
    code:string;
    PeriodName:string;
    Type:JournalTemplateType;
    totalDebitAmountLocal : number;
    totalCreditAmountLocal : number;
}