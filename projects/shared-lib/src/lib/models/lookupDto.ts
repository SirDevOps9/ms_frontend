export interface lookupDto {
  id: number;
  name: string;
}

export interface lookupsListDto {
  lookupName: string;
  items: lookupDto[];
}
