import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LanguageService } from 'shared-lib';


@Component({
  selector: 'app-attribute-definition-values',
  templateUrl: './attribute-definition-values.component.html',
  styleUrl: './attribute-definition-values.component.scss'
})
export class AttributeDefinitionValuesComponent {
  shouldShowNameEn: boolean = false;
  currentLang:any = ''
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef,
    public languageService: LanguageService,
  ) {
    this.currentLang = this.languageService.getLang();
  }

  tableData: any[] = [];



  ngOnInit() {
    const incomingData = this.config.data;
    if (incomingData && Array.isArray(incomingData.itemAttributes)) {
      this.tableData = incomingData.itemAttributes;
      this.shouldShowNameEn = incomingData.showNameEn || false;

    } else {
      this.tableData = [];
    }

  }
  onCancel() {
    this.ref.close();
  }

}
