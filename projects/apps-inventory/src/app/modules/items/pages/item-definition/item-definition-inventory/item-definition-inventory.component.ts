import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-item-definition-inventory',
  templateUrl: './item-definition-inventory.component.html',
  styleUrl: './item-definition-inventory.component.scss'
})
export class ItemDefinitionInventoryComponent {
  id: number;
  itemDefinitionForm: FormGroup;
  trackingDropDown: any[] = [];
  showTracking : boolean = false
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
    this.getInventoryData()
    this.createForm();
    this.itemDefinitionForm.get('hasExpiryDate')?.valueChanges.subscribe(res=>{
      if(res == true) {
        this.showTracking = true
        this.cdr.detectChanges(); // Trigger change detection manually

        setTimeout(() => {
          this.getTrackingDropDown();


        }, 100);
      } 
      else {
        this.showTracking = false
        
       } 
    })
  }
  getInventoryData(){
    this.itemService.getInvenrory(this.id)
    this.itemService.getInventoryData$.subscribe(data=>{
      this.itemDefinitionForm.patchValue({...data})
    })
  }

  createForm() {
    this.itemDefinitionForm = this.fb.group({
      id: [this.id],
      trackingId: [null ],
      hasExpiryDate: [false, Validators.required]
    });
  }

  getTrackingDropDown() {
    this.itemService.getTrackingDropDown();
    this.itemService.trackingTrackingDropDownObs.subscribe(res => {
      this.trackingDropDown = res 
    });
  }

  

  onAddVariants() {
    if (this.itemDefinitionForm.valid) {
      const payload = this.itemDefinitionForm.value;
      this.itemService.editInventory(payload)
    }
  }
}
