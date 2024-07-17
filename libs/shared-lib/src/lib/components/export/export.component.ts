import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ExportService } from '../../export/exportService';

@Component({
  selector: 'lib-export',
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent implements OnChanges {
  @Input() exportData: any  = []; 
  @Input() exportColumns: any  = []; 
  @Input() ExportName: string  = ''
  @Output() exportClick: EventEmitter<any> = new EventEmitter<any>();

  itemsMenu: MenuItem[] =  [
    { label: 'Excell', icon: 'pi pi-file-excel', command: () =>  this.excell() },
    { label: 'PDF', icon: 'pi pi-file-pdf', command: () =>  this.pdf()}
  ];;
  pdf() {
    this.exportClick.emit()
    
    ExportService.ToPDF(this.exportData, `${this.ExportName}.pdf`  , this.exportColumns);

  }
  excell() {
    this.exportClick.emit()
    ExportService.ToExcel(this.exportData, `${this.ExportName}.xlsx` , this.exportColumns);

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.exportData = changes['exportData']?.currentValue
    this.exportColumns = changes['exportColumns']?.currentValue

    console.log( changes)

    
  }
}
