export interface lookupDto {
  id: number | string;
  name: string;
}

export interface lookupsListDto {
  lookupName: string;
  items: lookupDto[];
}