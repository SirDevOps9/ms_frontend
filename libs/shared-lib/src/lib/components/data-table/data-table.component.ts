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

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit , OnChanges {
  itemsMenu: MenuItem[] =  [
    { label: 'Excell', icon: 'pi pi-file-excel', command: () =>  this.excell() },
    { label: 'PDF', icon: 'pi pi-file-pdf', command: () =>  this.pdf()}
  ];;
  pdf() {
    this.exportClick.emit()
    
    ExportService.ToPDF(this.exportData, 'Employee-List.pdf'  , this.exportColumns);

  }
  excell() {
    console.log(this.exportData)
    console.log(this.exportColumns)
    this.exportClick.emit()
    ExportService.ToExcel(this.exportData, 'Employee-List.xlsx' , this.exportColumns);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.exportData = changes['exportData']?.currentValue
    this.exportColumns = changes['exportColumns']?.currentValue

    console.log( changes)

    
  }
   
  @Input() items: any[];
  @Input() selectedIndex: number;
  @Input() resizableColumns: boolean = true;
  @Input() currentPageResult: PageInfoResult;

  @Input() tableConfigs: TableConfig;
  @Input() className:string='';

  @Input() rowTemplate: TemplateRef<any>;
  @Input() exportData: any  = []; 
  @Input() exportColumns: any  = []; 

  @Output() pageChange = new EventEmitter<PageInfo>();
  @Output() exportClick: EventEmitter<any> = new EventEmitter<any>();

  sortingFields: string[];

first:any=0;
  globalFilterFields: string[];

  @ViewChild('customCellTemplate', { static: true })
  customCellTemplate?: TemplateRef<any>;
  customParentCellTemplate: TemplateRef<NgIfContext<boolean>> | null;

  ngOnInit(): void {
    this.globalFilterFields = this.tableConfigs.columns
      .filter((c) => c.isSortable)
      .map((c) => c.name);
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
    public lookupsService: LookupsService
  ) {}
 
}
