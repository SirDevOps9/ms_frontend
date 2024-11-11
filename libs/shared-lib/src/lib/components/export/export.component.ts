import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ExportService } from '../../export/exportService';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'lib-export',
  templateUrl: './export.component.html',
  styleUrl: './export.component.css',
})
export class ExportComponent implements OnDestroy {
  private exportDataSubject = new Subject<any>();
  private exportDataSubscription: Subscription;
  private format: string = '';

  @Input() exportColumns: any = [];
  @Input() ExportName: string = '';
  @Input() labelTest: string = 'export-button';

  //@Input() exportData: any = [];
  private exportDataList: any = [];
  @Output() exportClick: EventEmitter<any> = new EventEmitter<any>();

  itemsMenu: MenuItem[] = [
    { label: 'Excel', icon: 'pi pi-file-excel', command: () => this.handleExport('excel') },
    { label: 'PDF', icon: 'pi pi-file-pdf', command: () => this.handleExport('pdf') },
  ];

  constructor() {
    this.exportDataSubscription = this.exportDataSubject.subscribe((data) => {
      if (data && data.length > 0) {
        this.exportDataList = data;
        this.performExport();
      }
    });
  }

  @Input()
  set exportData(value: any) {
    this.exportDataSubject.next(value);
  }

  handleExport(format: string) {
    this.exportClick.emit();
    this.format = format;
  }

  performExport() {
    if (this.exportDataList && this.exportDataList.length > 0) {
      if (this.format === 'excel') {
        this.exportToExcel();
      } else if (this.format === 'pdf') {
        this.exportToPDF();
      }
    } else {
      console.error('No data available for export');
    }
  }

  exportToPDF() {
    ExportService.ToPDF(this.exportDataList, `${this.ExportName}.pdf`, this.exportColumns);
  }

  exportToExcel() {
    ExportService.ToExcel(this.exportDataList, `${this.ExportName}.xlsx`, this.exportColumns);
  }

  ngOnDestroy(): void {
    this.exportDataSubscription.unsubscribe();
  }
}
