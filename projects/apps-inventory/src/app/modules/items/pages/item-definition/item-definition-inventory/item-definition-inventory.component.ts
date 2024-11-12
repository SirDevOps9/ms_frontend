import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lookupDto, LookupEnum, LookupsService, RouterService } from 'shared-lib';
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
  LookupEnum=LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  constructor(
    private _router: RouterService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private cdr: ChangeDetectorRef,
    private lookupservice : LookupsService

  ) {
    this.id = this.route.snapshot.params['id'];
    
  }

  ngOnInit(): void {
    this.getInventoryData()
    this.createForm();
    this.lookupservice.loadLookups([
      LookupEnum.TrackingType
    ]);
    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;   
      console.log(l)   
    });

    this.itemDefinitionForm.get('trackingType')?.valueChanges.subscribe(res=>{
      if(res == 'Batch') {
        this.itemDefinitionForm.get('hasExpiryDate')?.setValue(true)
      }
    })
  }
  getInventoryData(){
    this.itemService.getInvenrory(this.id)
    this.itemService.getInventoryData$.subscribe(data=>{
      if(Object.keys(data)?.length) {
        this.itemDefinitionForm.patchValue({...data})

      }
    })
  }

  createForm() {
    this.itemDefinitionForm = this.fb.group({
      id: [this.id],
      trackingType: [null ],
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
