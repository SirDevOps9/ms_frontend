import { ChangeDetectorRef, Component } from '@angular/core';
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
  showTax : boolean = false
  constructor(
    private _router: RouterService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private cdr: ChangeDetectorRef,

  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.createForm();
    this.getTaxData()
    this.itemDefinitionForm.get('isVatApplied')?.valueChanges.subscribe(res=>{
      if(res == true) {
        this.showTax = true
        this.cdr.detectChanges(); // Trigger change detection manually

        setTimeout(() => {
          this.taxesDropDropDown();


        }, 100);
      } 
      else {
        this.itemDefinitionForm.get('taxId')?.setValue(null)
        this.showTax = false
      } 
    })
  }

  createForm() {
    this.itemDefinitionForm = this.fb.group({
      id: [this.id],
      taxId: [null ],
      isVatApplied: [false, Validators.required]
    });
  }

  taxesDropDropDown() {
    this.itemService.taxesDropDropDown();
    this.itemService.taxesLookupObs.subscribe(res => {
      this.taxesDropDropDownLookup = res 
    });
  }

  getTaxData(){
    this.itemService.gettaxesDropDropDown(this.id)
    this.itemService.taxesDataLookupObs.subscribe((res : any)=>{
      console.log(res)
      this.itemDefinitionForm.patchValue({
        id: res.id,
        isVatApplied:res.isVatApplied,

        taxId:res.taxId,
      })
      console.log(this.itemDefinitionForm.value)
    })
  }
  

  onAddVariants() {
    if (this.itemDefinitionForm.valid) {
      const payload = this.itemDefinitionForm.value;
      this.itemService.editItemTax(payload)
    }
  }
}
