import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../../items.service';
import { AccountsDropDownLookup } from '../../../models/accountsDropDownLookup';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'shared-lib';


@Component({
  selector: 'app-item-definition-accounting',
  templateUrl: './item-definition-accounting.component.html',
  styleUrl: './item-definition-accounting.component.scss'
})
export class ItemDefinitionAccountingComponent {
id:any
dataAccouting:AccountsDropDownLookup[]=[]
selectForm:FormGroup
  constructor(private itemService:ItemsService,
    private route : ActivatedRoute ,
    private fb:FormBuilder,
    private formServices:FormsService
    ) {
    this.id = this.route.snapshot.paramMap.get('id'); // Ensure this ID exists in the URL
this.getAllAccounts()
this.creatFomrSelect()
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('Current ID:', this.id);
  });
  }

  form: FormGroup;
  countriesLookup: any[] = [
    { id: 1, name: "test" },
    { id: 2, name: "USA" },
    { id: 3, name: "Canada" }
  ];


  creatFomrSelect(){
    this.selectForm = this.fb.group({
      itemId: [this.id],
      pAccount: ['',Validators.required],
      prAccount: ['',Validators.required],
      sAccount: ['',Validators.required],
      srAccount: ['',Validators.required],

    })
  }

  onSave(){

    if (!this.formServices.validForm(this.selectForm) || this.selectForm.invalid) {
      return

  }
  console.log(this.selectForm.value);
}


  getAllAccounts(){
    this.itemService.AccountsDropDown()
    this.itemService.AccountsDropDownLookup.subscribe((data:any)=>{
      this.dataAccouting = data


    })
  }

}
