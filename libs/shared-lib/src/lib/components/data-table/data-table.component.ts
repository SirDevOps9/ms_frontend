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
import { LanguageService, LookupsService, RouterService } from '../../services';
import { TableConfig } from './data-table-column';
import { PageInfo, PageInfoResult, SortBy } from '../../models';
import { NgIfContext } from '@angular/common';
import { GeneralService } from '../../services/general.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() items: any[];
  @Input() selectedIndex: number;
  @Input() selectedIndices: number[];
  @Input() resizableColumns: boolean = true;
  @Input() popup: boolean = false;
  @Input() sequence: boolean = false;
  @Input() firstRow: boolean = false;
  @Input() currentPageResult: PageInfoResult;
  first: number = 0;
  @Input() tableConfigs: TableConfig;
  clonedTableConfigs: TableConfig;
  @Input() className: string = '';
  @Input() reportTable: boolean = false;
  @Input() rowTemplate: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<PageInfo>();
  @Output() addNew = new EventEmitter<boolean>(false);
  @Input() showCheckBox: boolean;

  selectedRows: any[] = [];
  
  @Output() selectedRowsChange = new EventEmitter<any[]>();

  //  to fill the dropdown in the component
  @Output() fiteredDropdOwn = new EventEmitter<TableConfig>();
  @Output() exportObj = new EventEmitter<{SortBy : number , SortColumn: string}>();

  sortingFields: string[];
  selectedColumns: any = [];

  globalFilterFields: string[];

  pageInfo: PageInfo;

  currentSortColumn: string | undefined;
  currentSortOrder: SortBy = SortBy.Descending;

  filtered_columns: any[];
  clonedList: any[];

  @ViewChild('customCellTemplate', { static: true })
  customCellTemplate?: TemplateRef<any>;
  customParentCellTemplate: TemplateRef<NgIfContext<boolean>> | null;
  rows: [];  selected_filtered_columns: any[] = [];
  searchColumnsControl = new FormControl([]);
  isRtl: boolean = false;
  showColumnFilter: boolean 

  ngOnInit(): void {
    this.isRtl = this.languageService.ar;
    // this.showColumnFilter = this.tableConfigs?.columns?.some(x=>x.name == 'id')
    this.filtered_columns = this.tableConfigs.columns
    this.selected_filtered_columns = this.filtered_columns.map((option) => option.name);
    this.searchColumnsControl.setValue(this.selected_filtered_columns as any);
    this.globalFilterFields = this.tableConfigs.columns
      .filter((c) => c.isSortable)
      .map((c) => c.name);
  }

  reactToColumnChanges() {
    this.generalService.sendFilteredListObs.subscribe((res) => {
      this.items = res;
    });
    this.generalService.sendSelectedColumnsObs.subscribe((res) => {
      if (res) {
        this.selectedColumns = res;
        this.tableConfigs.columns = this.generalService.sendFullColumns
          .getValue()
          .filter((elem: any) => {
            return this.selectedColumns.includes(elem.name) || elem.headerText === 'Actions';
          });
      }
    });
  }

  options = [
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
  ];

  first2: number = 0;

  rows2: any = 25;

  onPageChange2(pageInfoData: PageInfo | any) {
    this.pageInfo = pageInfoData;
    this.generalService.sendPageChanges.next(pageInfoData);
  }

  addNewItem() {
    this.addNew.emit(true);
  }

  selectRow(row: any) { }

  onPageChange(pageInfo: PageInfo) {
    pageInfo.sortColumn = this.currentSortColumn;
    pageInfo.sortBy = this.currentSortOrder;
    this.pageChange.emit(pageInfo);

    this.rows2 = pageInfo.first;
    this.first = pageInfo.first;
  }
  hasNestedHeaders(): boolean {
    return this.tableConfigs.columns.some((col) => col.children && col.children.length > 0);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.clonedTableConfigs = { ...this.tableConfigs };
  }
  routeToSequence() {
    const currentUrl = this.routerService.getCurrentUrl();
    this.routerService.navigateTo(`${currentUrl}/sequence`);
  }

  isSelected(index: number): boolean {
    if (this.selectedIndices) return this.selectedIndices.includes(index);
    return false;
  }

  toggleSelection(index: number): void {
    const selectedIndex = this.selectedIndices.indexOf(index);
    if (selectedIndex === -1) {
      this.selectedIndices.push(index);
    } else {
      this.selectedIndices.splice(selectedIndex, 1);
    }
  }

  onRowSelect(event: any) {
    this.selectedRows.push(event.data);
    this.selectedRowsChange.emit(this.selectedRows); 
  }

  onRowUnselect(event: any) {
    const index = this.selectedRows.findIndex((row) => row === event.data);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    }
    this.selectedRowsChange.emit(this.selectedRows); 
  }

  onSelectAllRows(event: any) {
    if (event.checked) {
      this.selectedRows = [...this.items];
    } else {
      this.selectedRows = []; 
    }
    this.selectedRowsChange.emit(this.selectedRows); 
  }


  onSortClick(columnName: string): void {
    if (columnName) {
      if (this.currentSortColumn === columnName) {
        this.currentSortOrder =
          this.currentSortOrder === SortBy.Ascending ? SortBy.Descending : SortBy.Ascending;
      } else {
        this.currentSortOrder = SortBy.Ascending;
      }

      this.currentSortColumn = columnName;


      setTimeout(() => {
        const pageInfo = new PageInfo(
          this.pageInfo?.pageNumber,
          this.pageInfo?.pageSize,
          this.pageInfo?.first,
          this.currentSortOrder,
          columnName
        );
        console.log('page info', pageInfo);
        this.onPageChange(pageInfo);
        this.exportObj.emit({SortBy:this.currentSortOrder , SortColumn : this.currentSortColumn as string})
      }, 100);
    }
  }

  constructor(
    public languageService: LanguageService,
    public lookupsService: LookupsService,
    private generalService: GeneralService,
    private routerService: RouterService
  ) { }

  handleFilterColumns(selectedColumns: string[]) {
    if (selectedColumns.length === 0) {
      this.tableConfigs.columns = [...this.clonedTableConfigs.columns];
    } else {
      const columns = [...this.clonedTableConfigs.columns];
      
      const filteredColumns = columns.filter((col) =>
        selectedColumns.some((sCol: string) => col.name === sCol)
      );
      // if(filteredColumns[filteredColumns.length - 1].name =="id"){

        this.tableConfigs.columns = [...filteredColumns];
      // } else{
      //   filteredColumns.push(this.clonedTableConfigs.columns[this.clonedTableConfigs.columns.length - 1])
      //   this.tableConfigs.columns = [...filteredColumns];
      // }
             
    }
  }
}
