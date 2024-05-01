export class AddJournalEntryCommand {
    refrenceNumber: string | null;
    journalDate: string;
    description: string;
    periodId: number;
    journalEntryLines: CreateJournalEntryLine[] = [];
    journalEntryAttachments: CreateJournalEntryAttachment[] = [];
}

export interface CreateJournalEntryAttachment {
    attachmentId: string;
    name: string;
}

export interface CreateJournalEntryLine {
    id: number;
    lineDescription: string | null;
    debitAmount: number;
    creditAmount: number;
    currencyId: number;
    currencyRate: number;
    accountId: number;
}