import { EditJournalEntryAttachment } from './edit-journal-entry-dto';
import { JournalEntryLineViewDto } from './journal-entry-lines-view-dto';
import { JournalEntryStatus } from './journalentrystatus';
import { JournalEntryType } from './journalentrytype';

export interface JournalEntryViewDto {
  id: number;
  journalCode: string;
  referenceNumber?: string;
  journalPeriod?: string;
  description?: string;
  journalDate: Date;
  type: JournalEntryType;
  sourceName: string;
  sourceCode: string;
  reversedJournalCode?: string;
  status: JournalEntryStatus;
  totalDebitAmount: number;
  totalCreditAmount: number;
  journalEntryLines?: JournalEntryLineViewDto[];
  paymentInId?: number;
  paymentOutId?: number;
  journalEntryAttachments:EditJournalEntryAttachment[]
}
