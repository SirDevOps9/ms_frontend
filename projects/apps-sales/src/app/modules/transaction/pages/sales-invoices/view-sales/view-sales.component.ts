import { Component } from '@angular/core';
import { TransactionService } from '../../../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { SalesInvoiceDetail, SalesInvoiceView } from '../../../models/salesInvoice-view';
import { LanguageService, RouterService } from 'shared-lib';

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




getDataSalesById(){
  this.transaction_services.getSalseInvoiceById(this._routeid)
  this.transaction_services.salesInvoiceViewObs.subscribe((res)=>{
    console.log(res);
    this.data=res
    this.salesInvoiceDetails = res.salesInvoiceDetails || [];
  })
}
onCancel(){
  this.routerService.navigateTo(`transaction/sales-invoice`);
}
get placeholder(): string {
  const vatAmount = this.data?.totalVatAmount || 0;
  const netAmount = this.data?.totalNetAmount || 0;
  return (vatAmount + netAmount).toFixed(2);
}
constructor(
  private transaction_services:TransactionService,
  private _route: ActivatedRoute,
  public languageService: LanguageService,
  private routerService: RouterService,
){
  this.currentLang = this.languageService.getLang();

}
}
