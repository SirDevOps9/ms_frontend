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
import { PageInfo, PageInfoResult } from '../../models';

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() items: any[];
  @Input() selectedIndex: number;
  @Input() currentPageResult: PageInfoResult;

  @Input() tableConfigs: TableConfig;
  @Input() className:string='';

  @Input() rowTemplate: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<PageInfo>();

  sortingFields: string[];

first:any=0;
  globalFilterFields: string[];

  @ViewChild('customCellTemplate', { static: true })
  customCellTemplate?: TemplateRef<any>;

  ngOnInit(): void {
    this.globalFilterFields = this.tableConfigs.columns
      .filter((c) => c.isSortable)
      .map((c) => c.name);
  }

  selectRow(row: any) {}

  onPageChange(pageInfo: PageInfo) {
    
    this.pageChange.emit(pageInfo);
  }

  constructor(
    public languageService: LanguageService,
    public lookupsService: LookupsService
  ) {}
}
