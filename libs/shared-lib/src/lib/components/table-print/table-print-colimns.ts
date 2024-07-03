import { TemplateRef } from '@angular/core';

export class DataTableColumn {
  name: string;

  headerText?: string;

  template?: TemplateRef<any>;

  suffixKey?: string;

  lookupKey?: string;

  isGlobalFilter?: boolean;

  isSortable?: boolean;
  rowspan?: string;
  colspan?: string;
  children?:DataTableColumn[];
  class?:string;
  body_class?:string;
}

export class TableConfig {
  columns: DataTableColumn[];

  pageSize?: number = 10;

  allowPagination?: boolean = true;

  allowServerPagination?: boolean = false;

  dataKey?: string;

  showCurrentPageReport?: boolean;

  cardTitleKey?: string;

  cardStatusKey?: string;

  enableSelection?: boolean;
}
