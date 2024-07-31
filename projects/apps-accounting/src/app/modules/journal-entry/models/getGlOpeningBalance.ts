import { JournalEntryLineDto } from "./jouranl-entry-line-dto";
import { JournalEntryGlBalanceLineDto } from "./JournalEntryGlBalanceLineDto";
import { JournalEntryStatus } from "./journalentrystatus";
import { JournalEntryType } from "./journalentrytype";

export class GetGlOpeningBalanceById {
    id: number;
    journalCode: string;
    referenceNumber?: string;
    journalPeriod?: string;
    description?: string;
    journalDate: string;
    type: JournalEntryType;
    sourceName: string;
    sourceCode: string;
    reversedJournalCode?: string; 
    status: JournalEntryStatus;
    totalDebitAmount: number;
    totalCreditAmount: number;
    openingBalanceJournalEntryLines?: JournalEntryGlBalanceLineDto[];
}