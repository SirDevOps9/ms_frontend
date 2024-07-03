export class AddJournalEntryCommand {
    refrenceNumber: string | null;
    journalDate: string;
    description: string;
    periodId: string;
    journalEntryLines: CreateJournalEntryLine[] = [];
    journalEntryAttachments: CreateJournalEntryAttachment[] = [];
}

export interface CreateJournalEntryAttachment {
    attachmentId: string;
    name: string;
}

export interface costCenter {
    costCenterId: number;
    percentage: number
}

export interface CreateJournalEntryLine {
    lineDescription: string | null;
    debitAmount: number;
    creditAmount: number;
    currencyId: number;
    currencyRate: number;
    accountId: number;
    costCenters  : costCenter[]


}