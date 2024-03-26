export interface FilterDto {
  orderBy?: string;
  isDesc?: boolean;
  PageInfo?: FilterBase;
  conditions?: Condition[];
}

export interface FilterBase {
  offset: number;
  pageSize: number;
}
export interface Condition {
  column: string;
  oprator: FilterOptions;
  value?: any;
  then?: AndOr;
}

export enum FilterOptions {
  StartsWith = 1,
  EndsWith,
  Contains,
  DoesNotContain,
  IsEmpty,
  IsNotEmpty,
  IsGreaterThan,
  IsGreaterThanOrEqualTo,
  IsLessThan,
  IsLessThanOrEqualTo,
  IsEqualTo,
  IsNotEqualTo,
  InList,
}

export enum AndOr {
  AND = 1,
  OR,
}
