import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-stock-in',
  templateUrl: './add-stock-in.component.html',
  styleUrl: './add-stock-in.component.scss'
})
export class AddStockInComponent implements OnInit{
  stockInForm : FormGroup = new FormGroup({})
constructor(private fb : FormBuilder){}
  ngOnInit(): void {
    this.stockInForm = this.fb.group({
      code  :''
    })
  }







  onCancel() {
    
  }

  onSave() {

  }
}
