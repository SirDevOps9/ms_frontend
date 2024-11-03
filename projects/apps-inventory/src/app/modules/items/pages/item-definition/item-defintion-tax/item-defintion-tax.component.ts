import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-item-defintion-tax',
  templateUrl: './item-defintion-tax.component.html',
  styleUrls: ['./item-defintion-tax.component.scss']
})
export class ItemDefintionTaxComponent {
  id: number;
  itemDefinitionForm: FormGroup;
  taxesDropDropDownLookup: any[] = [];
  taxesGetTaxDataById: any = {};
  isVatApplied: boolean = false;
  previousTaxId: any = null;

  constructor(
    private _router: RouterService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private itemService: ItemsService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.createForm();
    this.taxesDropDropDown();
    this.getTaxDataById();
  }

  createForm() {
    this.itemDefinitionForm = this.fb.group({
      id: [this.id],
      taxId: [null],
      isVatApplied: [false, Validators.required]
    });
  }

  taxesDropDropDown() {
    this.itemService.taxesDropDropDown();
    this.itemService.taxesLookupObs.subscribe(res => {
      this.taxesDropDropDownLookup = res || [];
    });
  }

  getTaxDataById() {
    this.itemService.getTaxDataById(this.id);
    this.itemService.taxesDataLookupObs.subscribe(res => {
      if (Array.isArray(res)) {
        if (res.length > 0) {
          const taxData = res[0];
          this.updateFormWithTaxData(taxData);
        }
      } else if (res && typeof res === 'object') {
        this.updateFormWithTaxData(res);
      }
    });
  }

  private updateFormWithTaxData(taxData: any) {
    this.taxesGetTaxDataById = taxData;
    this.isVatApplied = taxData.isVatApplied;
    this.previousTaxId = taxData.taxId;
    this.itemDefinitionForm.patchValue({
      taxId: taxData.taxId,
      isVatApplied: taxData.isVatApplied
    });
  }

  onVatAppliedChange(isApplied: boolean) {
    if (isApplied) {
      this.itemDefinitionForm.patchValue({ taxId: this.previousTaxId });
    } else {
      this.previousTaxId = this.itemDefinitionForm.get('taxId')?.value;
      this.itemDefinitionForm.patchValue({ taxId: null });
    }
  }


  onAddVariants() {
    if (this.itemDefinitionForm.valid) {
      const payload = this.itemDefinitionForm.value;
      this.itemService.editItemTax(payload);
    }
  }
}
