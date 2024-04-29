import { JournalTemplateType } from "./journalentrytemplatetype";

export class GetAllJournalTemplateDto{
    code:string;
    PeriodName:string;
    Type:JournalTemplateType;
    totalDebitAmountLocal : number;
    totalCreditAmountLocal : number;
}