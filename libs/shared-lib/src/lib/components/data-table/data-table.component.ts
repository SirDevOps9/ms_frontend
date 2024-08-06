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

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit , OnChanges  {

   
  @Input() items: any[];
  @Input() selectedIndex: number;
  @Input() resizableColumns: boolean = true;
  @Input() currentPageResult: PageInfoResult;

  @Input() tableConfigs: TableConfig;
  clonedTableConfigs: TableConfig;
  @Input() className:string='';

  @Input() rowTemplate: TemplateRef<any>;

  @Output() pageChange = new EventEmitter<PageInfo>();

  sortingFields: string[];
  selectedColumns: any = []


first:any=0;
  globalFilterFields: string[];

  @ViewChild('customCellTemplate', { static: true })
  customCellTemplate?: TemplateRef<any>;
  customParentCellTemplate: TemplateRef<NgIfContext<boolean>> | null;

  ngOnInit(): void {
    this.globalFilterFields = this.tableConfigs.columns
      .filter((c) => c.isSortable)
      .map((c) => c.name);
      console.log(this.globalFilterFields)
      this.generalService.sendColumns.next(this.globalFilterFields)
      this.generalService.sendFullColumns.next(this.tableConfigs.columns)

      this.reactToColumnChanges()

      console.log( this.globalFilterFields)

   
    
  }

  reactToColumnChanges() {
    this.generalService.sendFilteredListObs.subscribe(res=>{
      this.items = res
    })
    this.generalService.sendSelectedColumnsObs.subscribe(res=>{
      if(res) {
        this.selectedColumns = res
        this.tableConfigs.columns =  this.generalService.sendFullColumns.getValue().filter((elem: any) => {
          return this.selectedColumns.includes(elem.name) || elem.headerText === 'Actions';
      });
        console.log(this.generalService.sendFullColumns.getValue())
      }
     

    })
  }

  selectRow(row: any) {}

  onPageChange(pageInfo: PageInfo) {
    
    this.pageChange.emit(pageInfo);
  }
  hasNestedHeaders(): boolean {
    return this.tableConfigs.columns.some(col => col.children && col.children.length > 0);
  }


  

  constructor(
    public languageService: LanguageService,
    public lookupsService: LookupsService,
    private generalService : GeneralService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
  this.clonedTableConfigs = this.tableConfigs
  console.log( this.items,"44444")
  console.log( changes,"44444")
 this.items=changes["items"].currentValue
 console.log(  this.items,"666666")

  }
 
}
