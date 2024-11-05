import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-attribute-definition-list-values',
  templateUrl: './attribute-definition-list-values.component.html',
  styleUrl: './attribute-definition-list-values.component.scss'
})
export class AttributeDefinitionListValuesComponent {
  shouldShowNameEn: boolean = false;
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef
  ) {}

  tableData: any[] = [];



  ngOnInit() {
    this.tableData = this.config.data ? [this.config.data] : [];

   console.log("saqqq" , this.tableData);

    // if (incomingData && Array.isArray(incomingData.itemAttributes)) {
    //   this.tableData = incomingData.itemAttributes;
    //   this.shouldShowNameEn = incomingData.showNameEn || false;

    // } else {
    //   this.tableData = [];
    // }

  }
  onCancel() {
    this.ref.close();
  }

}
