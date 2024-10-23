import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemsService } from '../../../items.service';
import { AccountsDropDownLookup } from '../../../models/accountsDropDownLookup';


@Component({
  selector: 'app-item-definition-accounting',
  templateUrl: './item-definition-accounting.component.html',
  styleUrl: './item-definition-accounting.component.scss'
})
export class ItemDefinitionAccountingComponent {

  dataAccouting:AccountsDropDownLookup[]=[]

/*

 this.form = new FormGroup({
      countryOfOrigin: new FormControl(null)
    });
*/
  constructor(private itemService:ItemsService) {
this.getAllAccounts()
  }
  form: FormGroup;
  countriesLookup: any[] = [
    { id: 1, name: "test" },
    { id: 2, name: "USA" },
    { id: 3, name: "Canada" }
  ];

  getAllAccounts(){
    this.itemService.AccountsDropDown()
    this.itemService.AccountsDropDownLookup.subscribe((data:any)=>{
      this.dataAccouting = data


    })
  }

}
