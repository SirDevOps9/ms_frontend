import { FilterOptions } from './filterDto';

export interface SearchField {
  type: string;
  name: string;
  text: string;
  operator: FilterOptions;
}
