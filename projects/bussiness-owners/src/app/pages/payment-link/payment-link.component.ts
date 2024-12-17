import { Component, OnInit } from '@angular/core';
import { BusinessOwnerService } from '../business-owner.service';

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.component.html',
  styleUrl: './payment-link.component.scss'
})
export class PaymentLinkComponent implements OnInit {
  ngOnInit() {
    console.log( "88888888888888");

this.bussinesOwnerService.getInvoice('791215ee-ca12-4716-a010-08dd1e7c4618').subscribe((res)=>{
  console.log(res ,"88888888888888");
  
})
  }
  constructor(private bussinesOwnerService: BusinessOwnerService) {}

}
