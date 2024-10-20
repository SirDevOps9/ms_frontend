import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTagDto } from 'projects/apps-purchase/src/app/modules/purchase/models';
import { FormsService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { VieItemDefinitionDto } from '../../../models/VieItemDefinitionDto';
import { Subscription } from 'rxjs';
import { ExportService } from 'libs/shared-lib/src/lib/export/exportService';



@Component({
  selector: 'app-view-item-definition',
  templateUrl: './view-item-definition.component.html',
  styleUrls: ['./view-item-definition.component.scss']  // Corrected styleUrls typo
})
export class ViewItemDefinitionComponent implements OnInit {
  private exportDataSubscription: Subscription;
  tagForm: FormGroup;
  modulelist: VieItemDefinitionDto[];
  selectedModules: number[] = [];
  dataTabel: any[] = []; 
  private format: string = '';
  dataTabels: any=[];  // Initialize as an array
  private exportDataList: any = [];
  @Input() ExportName: string = '';
  @Input() exportColumns: any = [];
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
    private itemsService: ItemsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.moudlelist();
    this.sub();
  }

  sub() {
    this.itemsService.ViewDataDefinitionByIdObs.subscribe((res: any) => {
      if (res && res.storageInformationDto) {
        this.dataTabel = res.storageInformationDto;  
      }
      if (Array.isArray(res.otherDataArray)) {
        this.dataTabels = res.otherDataArray;  
      } else {
        this.dataTabels = [res];  
      }
    });
  }
  
  
  moudlelist() {
    if (this.config.data) {
      this.itemsService.ViewDefinitionById(this.config.data.id);
    }
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.tagForm)) return;   
    const tagDto: AddTagDto = this.tagForm.value;
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
}
