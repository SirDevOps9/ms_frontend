import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../../finance.service';
import { ActivatedRoute } from '@angular/router';
import { GetPaymentTermById } from '../../../models/get-payment-term-by-id-dto';

@Component({
  selector: 'app-view-payment-term',
  templateUrl: './view-payment-term.component.html',
  styleUrls: ['./view-payment-term.component.scss']
})
export class ViewPaymentTermComponent implements OnInit {
  ViewForm: GetPaymentTermById = {} as GetPaymentTermById;
  id: number = this.route.snapshot.params['id'];

 

  constructor(
    private financeService: FinanceService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.loadView();
  }

  loadView() {
    this.financeService.viewPaymentTerm(this.id).subscribe((res) => {
      this.ViewForm = res;
    });

  }

}
