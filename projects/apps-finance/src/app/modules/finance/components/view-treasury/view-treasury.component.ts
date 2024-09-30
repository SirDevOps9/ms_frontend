import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetTreasuryDtoById, TreasuryViewDto } from '../../models';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FinanceService } from '../../finance.service';
import { LayoutService } from 'apps-shared-lib';

@Component({
  selector: 'app-view-treasury',
  templateUrl: './view-treasury.component.html',
  styleUrl: './view-treasury.component.scss'
})
export class ViewTreasuryComponent {
  ViewForm: TreasuryViewDto = {} as TreasuryViewDto;

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private financeService: FinanceService,
  ) {}

  ngOnInit() {
    this.getTreasuryView();
  }

  getTreasuryView() {
    this.financeService.getTreasuryDefinitionsView(this.config.data).subscribe((res) => {
      this.ViewForm = res;
    });
  }
  onCancel() {
    this.ref.close();
  }
}
