import { JournalEntryLineDto } from "./jouranl-entry-line-dto";
import { JournalEntryStatus } from "./journalentrystatus";
import { JournalEntryType } from "./journalentrytype";

export interface GetJournalEntryByIdDto {
    id: number;
    journalCode: string;
    referenceNumber?: string;
    journalPeriod?: string;
    description?: string;
    createdOn: Date;
    type: JournalEntryType;
    sourceName: string;
    sourceCode: string;
    isRepeated: boolean;
    isReversed: boolean;
    reversedJournalCode?: string;
    status: JournalEntryStatus;
    totalDebitAmount: number;
    totalCreditAmount: number;
    journalEntryLines?: JournalEntryLineDto[];
  }
  

