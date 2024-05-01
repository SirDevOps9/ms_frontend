import { JournalEntryStatus } from "./journalentrystatus";
import { JournalEntryType } from "./journalentrytype";


export class JournalEntryDto{
    id:number;
    journalCode:string;
    refrenceNumber : string;
    createdOn : Date;
    type:JournalEntryType;
    sourceName : string;
    sourceCode : string;
    isRepeated : boolean;
    isReversed : boolean;
    status : JournalEntryStatus;
    totalDebitAmount : number;
    totalCreditAmount : number;
}
