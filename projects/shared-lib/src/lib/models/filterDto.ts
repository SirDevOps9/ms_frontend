import { PageInfo } from ".";
export interface FilterDto {
  orderBy?: string;
  isDesc?: boolean;
  PageInfo?: PageInfo;
  conditions?: Condition[];
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
