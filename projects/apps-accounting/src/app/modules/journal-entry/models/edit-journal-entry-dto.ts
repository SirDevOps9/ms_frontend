import { EditJournalEntryLine } from "./edit-journal-entry-line-dto";

export class EditJournalEntry {
    id: number;
    referenceNumber?: string;
    journalDate: Date;
    description: string;
    journalEntryLines?: EditJournalEntryLine[];
  }
  
