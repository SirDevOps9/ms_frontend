import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { LanguageService, LookupsService } from '../../services';
import { TableConfig } from './data-table-column';

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() items: any[];

  @Input() tableConfigs: TableConfig;

  @Input() rowTemplate: TemplateRef<any>;

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

  constructor(
    public languageService: LanguageService,
    public lookupsService: LookupsService
  ) {}
}
