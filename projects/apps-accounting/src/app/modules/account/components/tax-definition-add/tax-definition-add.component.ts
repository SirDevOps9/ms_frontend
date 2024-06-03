import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { GetLevelsDto, listAddLevelsDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-tax-definition-add',
  templateUrl: './tax-definition-add.component.html',
  styleUrl: './tax-definition-add.component.scss'
})
export class TaxDefinitionAddComponent {

  constructor(
    private accountService: AccountService,
    private ref: DynamicDialogRef,
  
  ) {}

  ngOnInit() {
    

  }




  save() {
 
    this.ref.close();
  }

  close() {
    this.ref.close();
  }


}

