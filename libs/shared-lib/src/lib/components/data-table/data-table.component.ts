import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import { LanguageService, LookupsService, RouterService } from '../../services';
import { TableConfig } from './data-table-column';
import { PageInfo, PageInfoResult } from '../../models';
import { NgIfContext } from '@angular/common';
import { GeneralService } from '../../services/general.service';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';

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

  //  to fill the dropdown in the component
  @Output() fiteredDropdOwn = new EventEmitter<TableConfig>();

  sortingFields: string[];
  selectedColumns: any = [];

  globalFilterFields: string[];

  filtered_columns: any[];
  clonedList: any[];

  @ViewChild('customCellTemplate', { static: true })
  customCellTemplate?: TemplateRef<any>;
  customParentCellTemplate: TemplateRef<NgIfContext<boolean>> | null;

  selected_filtered_columns: any[] = [];
  searchColumnsControl = new FormControl([]);

  pTaple = viewChild('dt', { read: Table });

  ngOnInit(): void {
    // this.handleFilterColumns();
    this.searchColumnsControl.valueChanges
      .pipe(tap((res) => this.handleFilterColumns(res || [])))
      .subscribe();

    this.filtered_columns = this.tableConfigs.columns;
    console.log(this.globalFilterFields);
    console.log(this.tableConfigs);
    console.log(this.selected_filtered_columns);

    console.log(this.tableConfigs);
    this.globalFilterFields = this.tableConfigs.columns
      .filter((c) => c.isSortable)
      .map((c) => c.name);
    // this.generalService.sendColumns.next(this.globalFilterFields);
    // this.generalService.sendFullColumns.next(this.tableConfigs.columns);
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
        console.log(this.selectedColumns);
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
    this.generalService.sendPageChanges.next(pageInfoData);
  }

  addNewItem() {
    this.addNew.emit(true);
  }

  selectRow(row: any) {}

  onPageChange(pageInfo: PageInfo) {
    this.pageChange.emit(pageInfo);

    this.rows2 = pageInfo.first;
    this.first = pageInfo.first;
    console.log(this.currentPageResult);
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
  constructor(
    public languageService: LanguageService,
    public lookupsService: LookupsService,
    private generalService: GeneralService,
    private routerService: RouterService
  ) {}

  filterList: any[];

  // handleFilterColumns() {
  //   this.searchColumnsControl = new FormControl([]);
  //   this.searchColumnsControl.valueChanges.subscribe((selectedColumns: string[]) => {
  //     debugger
  //     console.log('Selected columns:', selectedColumns);
  //     console.log(

  //      this.clonedList =   this.tableConfigs.columns.filter(x=>selectedColumns.includes(x.name))
  //     );

  // })
  // }
  handleFilterColumns(selectedColumns: string[]) {
    // Listen to changes in the FormControl's value

    // If no columns are selected, restore the original columns
    if (selectedColumns.length === 0) {
      this.tableConfigs.columns = [...this.clonedTableConfigs.columns]; // Restore original columns
    } else {
      const columns = [...this.clonedTableConfigs.columns];

      const filteredColumns = columns.filter((col) =>
        selectedColumns.some((sCol: string) => col.name === sCol)
      );

      this.tableConfigs.columns = [...filteredColumns];
      this.pTaple()?.cd.detectChanges();
    }
  }
}
