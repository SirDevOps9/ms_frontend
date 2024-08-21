import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService, lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { GetAllPaymentInDto } from '../../../models';
import { FinanceService } from '../../../finance.service';

@Component({
  selector: 'app-payment-in-list',
  templateUrl: './payment-in-list.component.html',
  styleUrls: ['./payment-in-list.component.scss']
})
export class PaymentInListComponent implements OnInit {

  tableData: GetAllPaymentInDto[];

  currentPageInfo: PageInfoResult = {};
  searchTerm: string;

  exportColumns: lookupDto[];
  exportData: GetAllPaymentInDto[];


  constructor(private financeService: FinanceService,
    private routerService: RouterService,
    private title: Title,
    private langService: LanguageService,) { }

 
  ngOnInit() {
    this.subscribes();
    this.initPaymentInData();
    this.title.setTitle(
      this.langService.transalte('payment-in.payment-in')
    );
  }

  routeToAdd() {
     //todo
    this.routerService.navigateTo('');
  }

  routeToEdit(id: number) {
     //todo
    this.routerService.navigateTo( `/${id}`);
  }

  initPaymentInData() {
    this.financeService.getAllPaymentIn('', new PageInfo());
  }
  subscribes(){
    this.financeService.paymentInDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });

    this.financeService.exportedPaymentinDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getAllPaymentIn('', pageInfo);

    // this.financeService.paymentInDataSourceObservable.subscribe({
    //   next: (res) => {
    //     this.tableData = res;
    //   },
    // });
  }

  onSearchChange(event: any) {
    this.financeService.getAllPaymentIn(event.target.value, new PageInfo());

    // this.financeService.paymentInDataSourceObservable.subscribe({
    //   next: (res) => {
    //     this.tableData = res;
    //   },
    // });
  }

  
  exportClick() {
    this.financeService.exportsPaymentInList(this.searchTerm);
    
  }

  onDelete(id: number) {
    this.financeService.deletePaymentIn(id);
  }

  view(id: number) {
    //todo
    this.routerService.navigateTo(`/view/${id}`);
  }

}
