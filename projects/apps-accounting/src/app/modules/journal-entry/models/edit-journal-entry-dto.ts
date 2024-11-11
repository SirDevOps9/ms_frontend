import { EditJournalEntryLine } from "./edit-journal-entry-line-dto";

export class EditJournalEntry {
    id: number;
    referenceNumber?: string;
    journalDate: string;
    description: string;
    journalEntryLines?: EditJournalEntryLine[];
    journalEntryAttachments?: EditJournalEntryAttachment[];
  }
  
  export class EditJournalEntryAttachment {
    id: number;
    attachmentId: string;
    name: string;
}