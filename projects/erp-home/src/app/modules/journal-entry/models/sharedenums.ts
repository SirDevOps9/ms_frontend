import { Injectable } from "@angular/core";
import { JournalEntryStatus } from "./journalentrystatus";

@Injectable({
    providedIn: 'root',
})
export class SharedJournalEnums {
    get JournalEntryStatus(): typeof JournalEntryStatus {
        return JournalEntryStatus;
    }
}
