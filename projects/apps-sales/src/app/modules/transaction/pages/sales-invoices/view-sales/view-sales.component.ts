import { Component } from '@angular/core';
import { TransactionService } from '../../../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { SalesInvoiceDetail, SalesInvoiceView } from '../../../models/salesInvoice-view';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrl: './view-sales.component.scss'
})
export class ViewSalesComponent {

data: Partial<SalesInvoiceView> = {};
tableData: SalesInvoiceView[] = [];
salesInvoiceDetails: SalesInvoiceDetail[] = [];
  _routeid:number
  currentLang:string = ''
ngOnInit(): void {
  this._routeid = this._route.snapshot.params['id'];
  this.getDataSalesById()
}


constructor(
  private transaction_services:TransactionService,
  private _route: ActivatedRoute,
  public languageService: LanguageService,
){
  this.currentLang = this.languageService.getLang();

}
//                 const nameAttribute= this.currentLang === 'en' ? element.nameEn : element.nameAr;

getDataSalesById(){
  this.transaction_services.getSalseInvoiceById(this._routeid)
  this.transaction_services.salesInvoiceViewObs.subscribe((res)=>{
    console.log(res);
    this.data=res
    this.salesInvoiceDetails = res.salesInvoiceDetails || [];
  })
}
}
