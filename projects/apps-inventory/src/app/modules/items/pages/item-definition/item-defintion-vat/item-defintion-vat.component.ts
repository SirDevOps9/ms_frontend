import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterService, } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-item-defintion-vat',
  templateUrl: './item-defintion-vat.component.html',
  styleUrls: ['./item-defintion-vat.component.scss']
})
export class ItemDefintionVatComponent implements OnInit {
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
    this.itemService.gettaxesDropDropDown(this.id);
    this.itemService.taxesDataLookupObs.subscribe(res => {
      this.taxesDropDropDownLookup = res || [];  // Ensure `res` is an array
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
