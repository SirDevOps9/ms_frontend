import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { LanguageService, LookupsService } from '../../services';
import { TableConfig } from './data-table-column';
import { FilterBase } from '../../models';

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @Input() items: any[];

  @Input() allowPagination: boolean = false;

  @Input() tableConfigs: TableConfig;

  @Input() rowTemplate: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<FilterBase>();

  sortingFields: string[];

  globalFilterFields: string[];

  @ViewChild('customCellTemplate', { static: true })
  customCellTemplate?: TemplateRef<any>;

  ngOnInit(): void {
    this.globalFilterFields = this.tableConfigs.columns
      .filter((c) => c.isSortable)
      .map((c) => c.name);
  }

  selectRow(row: any) {}
  onPageChange(pageInfo: FilterBase) {
    this.pageChange.emit(pageInfo);
  }
  constructor(
    public languageService: LanguageService,
    public lookupsService: LookupsService
  ) {}
}
