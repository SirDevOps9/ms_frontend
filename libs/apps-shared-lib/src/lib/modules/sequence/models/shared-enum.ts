import { Injectable } from "@angular/core";
import { SequenceTypes } from "./sequenceTypes-enum";
import { Separators } from "./separators-enum";
import { Segments } from "./segments-enum";
@Injectable({
    providedIn: 'root',
})
export class SharedEnums {
    get SequenceTypes(): typeof SequenceTypes {
        return SequenceTypes;
    }

    get Separators(): typeof Separators {
        return Separators;  // Return the enum itself, not individual values
    }
    getSeparatorEntries(): { key: string, value: number }[] {
        return Object.values(Separators)
        .filter(value => typeof value === 'number') // Filter to only numeric enum values
        .map(value => ({
            // key: value as number,
            // value: this.getSeparatorValue(value as Separators) // Map enum value to symbol
            key: this.getSeparatorValue(value as Separators), // Map enum value to symbol
            value:value as number
        }));
    }
    getSeparatorValue(separator: Separators): string {
        switch (separator) {
            case Separators.Dash:
                return '-';
            case Separators.Underscore:
                return '_';
            case Separators.Dot:
                return '.';
            case Separators.ForwardSlash:
                return '/';
            case Separators.BackSlash:
                return '\\';
            case Separators.Asterisk:
                return '*';
            case Separators.Hash:
                return '#';
            default:
                return '';
        }
    }
    get Segments(): typeof Segments {
        return Segments;
    }
      getSegmentEntries(): { key: string, value: string }[] {
        return Object.keys(Segments)
            .filter(key => isNaN(Number(key))) // Filter out numeric keys
            .map(key => ({
                key, // Enum key name like 'Text', 'Year'
                value: Segments[key as keyof typeof Segments] // Enum value like 1, 2, 3...
            }));
    }

}