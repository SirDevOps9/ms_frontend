import { EditJournalEntryLine } from "./edit-journal-entry-line-dto";

export class EditJournalEntry {
    id: number;
    refrenceNumber?: string;
    journalDate: Date;
    description: string;
    journalEntryLines?: EditJournalEntryLine[];
  }
  
