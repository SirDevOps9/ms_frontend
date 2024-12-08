export interface LookupDto {
  name: string;
  id: number;
}

export interface LookupReturn {
  items: LookupDto[];
  lookupName: string;
}
