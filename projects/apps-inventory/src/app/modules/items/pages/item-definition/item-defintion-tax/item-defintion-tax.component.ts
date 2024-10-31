import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-item-defintion-tax',
  templateUrl: './item-defintion-tax.component.html',
  styleUrl: './item-defintion-tax.component.scss'
})
export class ItemDefintionTaxComponent {
  id: number;
  itemDefinitionForm: FormGroup;
  taxesDropDropDownLookup: any[] = [];

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
  }

  createForm() {
    this.itemDefinitionForm = this.fb.group({
      id: [this.id],
      taxId: [null, ],
      isVatApplied: [false, Validators.required]
    });
  }

  taxesDropDropDown() {
    this.itemService.taxesDropDropDown();
    this.itemService.taxesLookupObs.subscribe(res => {
      this.taxesDropDropDownLookup = res || [];
      console.log(this.taxesDropDropDownLookup);
    });
  }

  onAddVariants() {
    if (this.itemDefinitionForm.valid) {
      const payload = this.itemDefinitionForm.value;
      this.itemService.editItemTax(payload)
    }
  }
}
