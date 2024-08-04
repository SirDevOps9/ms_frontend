export class AddJournalEntryCommandOpeningBalance {
    refrenceNumber: string | null;
    journalDate: string;
    description: string;
    periodId: string;
    openingBalanceJournalEntryLines?: CreateJournalEntryLineOpeningBalance[] = [];
    openingBalanceJournalEntryAttachments?:CreateJournalEntryAttachmentOpeningBalance[] = [];
}

export interface CreateJournalEntryAttachmentOpeningBalance {
    attachmentId: string;
    name: string;
}

export interface costCenterOpeningBalance {
    costCenterId: number;
    percentage: number
}

export interface CreateJournalEntryLineOpeningBalance {
    lineDescription: string | null;
    debitAmount: number;
    creditAmount: number;
    currencyId: number;
    currencyRate: number;
    accountId: number;
    costCenters  : costCenterOpeningBalance[]


}