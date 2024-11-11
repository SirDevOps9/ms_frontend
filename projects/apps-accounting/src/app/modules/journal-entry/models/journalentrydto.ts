import { JournalEntryStatus } from './journalentrystatus';
import { JournalEntryType } from './journalentrytype';

export class JournalEntryDto {
  id: number;
  journalCode: string;
  refrenceNumber: string;
  createdOn: Date;
  journalDate: Date;
  type: JournalEntryType;
  sourceName: string;
  sourceCode: string;
  isRepeated: boolean;
  isReversed: boolean;
  status: JournalEntryStatus;
  totalDebitAmount: number;
  totalCreditAmount: number;
  paymentInId?: number;
  paymentOutId?: number;
}
