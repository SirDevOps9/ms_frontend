import { TemplateRef } from '@angular/core';

export class DataTableColumn {
  name: string;

  headerText?: string;

  template?: TemplateRef<any>;

  suffixKey?: string;

  lookupKey?: string;

  isGlobalFilter?: boolean;

  isSortable?: boolean;
}

export class TableConfig {
  columns: DataTableColumn[];

  pageSize?: number = 10;

  allowPagination?: boolean = true;

  dataKey?: string;

  showCurrentPageReport?: boolean;

  cardTitleKey?: string;

  cardStatusKey?: string;

  enableSelection?: boolean;
}
