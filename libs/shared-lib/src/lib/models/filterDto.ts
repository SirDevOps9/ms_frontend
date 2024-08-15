import { PageInfo } from '.';
// export interface FilterDto {
//   orderBy?: string;
//   isDesc?: boolean;
//   PageInfo?: PageInfo;
//   conditions?: Condition[];
// }

export class FilterDto {
  orderBy?: string;
  isDesc?: boolean;
  pageInfo?: PageInfo;
  conditions?: Condition[];

  get toQuery(): string {
    
    let query = '';

    if (this.pageInfo) query += this.pageInfo.toQuery;


    if (this.conditions) {

      query += '&';

      for (let i = 0; i < this.conditions.length; i++) {

        query += `Conditions[${i}].Column=${this.conditions[i].column}&Conditions[${i}].Value=${this.conditions[i].value}&Conditions[${i}].Operator=${this.conditions[i].operator}`;

        query += i === this.conditions.length - 1 ? '' : '&';
      }
    }

    return query;
  }
}

export interface Condition {
  column: string;
  operator: FilterOptions;
  value?: any;
  // then?: AndOr;
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
