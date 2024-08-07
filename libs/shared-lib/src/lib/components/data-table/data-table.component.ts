import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { LanguageService, LookupsService } from '../../services';
import { TableConfig } from './data-table-column';
import { FilterDto, PageInfo, PageInfoResult } from '../../models';
import { NgIfContext } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ExportService } from 'libs/shared-lib/src/lib/export/exportService';
import { Observable } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() items: any[];
  @Input() selectedIndex: number;
  @Input() resizableColumns: boolean = true;
  @Input() currentPageResult: PageInfoResult;
  first : number = 0
  @Input() tableConfigs: TableConfig;
  clonedTableConfigs: TableConfig;
  @Input() className: string = '';

  @Input() rowTemplate: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<PageInfo>();

  sortingFields: string[];
  selectedColumns: any = [];


  globalFilterFields: string[];

  @ViewChild('customCellTemplate', { static: true })
  customCellTemplate?: TemplateRef<any>;
  customParentCellTemplate: TemplateRef<NgIfContext<boolean>> | null;

  ngOnInit(): void {
    this.globalFilterFields = this.tableConfigs.columns
      .filter((c) => c.isSortable)
      .map((c) => c.name);
    // this.generalService.sendColumns.next(this.globalFilterFields);
    // this.generalService.sendFullColumns.next(this.tableConfigs.columns);
      console.log(this.globalFilterFields)
      // this.generalService.sendColumns.next(this.globalFilterFields)
      // this.generalService.sendFullColumns.next(this.tableConfigs.columns)

      //  this.reactToColumnChanges()

      // console.log( this.globalFilterFields)

      // this.generalService.sendPageChangesFromMainPaginationsObs.subscribe(res=>{
      //   console.log(res)
      // })
    
    // this.reactToColumnChanges();
  }

  reactToColumnChanges() {
    this.generalService.sendFilteredListObs.subscribe((res) => {
      this.items = res;
    });
    this.generalService.sendSelectedColumnsObs.subscribe((res) => {
      if (res) {

        this.selectedColumns = res;
        console.log( this.selectedColumns)
        this.tableConfigs.columns = this.generalService.sendFullColumns
          .getValue()
          .filter((elem: any) => {
            return this.selectedColumns.includes(elem.name) || elem.headerText === 'Actions';
          });
        console.log(this.generalService.sendFullColumns.getValue());
      }
    });
  }

  options = [
    { label: 25, value: 25},
    { label: 50, value: 50 },
    { label: 100, value: 100 },
];

first2: number  = 0;

rows2: any = 25;

onPageChange2(pageInfoData: PageInfo | any) {
this.generalService.sendPageChanges.next(pageInfoData)

}

  
  selectRow(row: any) {}
 
  onPageChange(pageInfo: PageInfo) {
    this.pageChange.emit(pageInfo);

    this.rows2 = pageInfo.first
    this.first = pageInfo.first
    console.log(this.currentPageResult)


  }
  hasNestedHeaders(): boolean {
    return this.tableConfigs.columns.some((col) => col.children && col.children.length > 0);
  }

  constructor(
    public languageService: LanguageService,
    public lookupsService: LookupsService,
    
    private generalService: GeneralService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.clonedTableConfigs = this.tableConfigs;
  }
}
