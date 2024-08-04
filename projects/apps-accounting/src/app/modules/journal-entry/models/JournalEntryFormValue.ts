import { JournalEntryLineFormValue } from "./JournalEntryLineFormValue";

export class JournalEntryFormValue {
    refrenceNumber: string;
    journalDate: string;
    periodId: string;
    description: string;
    journalEntryAttachments: { attachmentId: string; name: string }[];
    journalEntryLines: JournalEntryLineFormValue[];
}
