import { Injectable } from "@angular/core";
import { JournalEntryStatus } from "./journalentrystatus";
import { JournalEntryType } from "./journalentrytype";

@Injectable({
    providedIn: 'root',
})
export class SharedJournalEnums {
    get JournalEntryStatus(): typeof JournalEntryStatus {
        return JournalEntryStatus;
    }

    get JournalEntryType(): typeof JournalEntryType {
        return JournalEntryType;
    }
}
