import { Component, OnInit } from '@angular/core';
import { ViewBankDto } from '../../../models';
import { FinanceService } from '../../../finance.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-bank-definition',
  templateUrl: './view-bank-definition.component.html',
  styleUrls: ['./view-bank-definition.component.css']
})
export class ViewBankDefinitionComponent implements OnInit {

  ViewForm: ViewBankDto = {} as ViewBankDto;
  id: number = this.route.snapshot.params['id'];

  constructor(
    private financeService: FinanceService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.loadView();
  }

  loadView() {
    this.financeService.viewBank(this.id).subscribe((res) => {
      this.ViewForm = res;
    });

  }
 

}
