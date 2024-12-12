export interface JournalEntryFilterDto {
  [key: string]: string | string[] | undefined;
  fromDate?: string;
  toDate?: string;
  type?: string[];
  status?: string[];
  sourceDocument?: string[];
}
