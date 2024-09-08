import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsService } from 'shared-lib';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.scss'
})
export class AddWarehouseComponent implements OnInit {
  constructor(private fb : FormBuilder , private formService : FormsService){}
  ngOnInit(): void {
   this.warehouseForm = this.fb.group({
    moduleIds : '',
    code : '',
    name : '',

   })
  }
  warehouseForm : FormGroup = new FormGroup({})

  onSubmit() {

  }
}
