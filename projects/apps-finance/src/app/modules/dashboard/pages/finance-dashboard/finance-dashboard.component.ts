import { Component } from '@angular/core';
import { Chart } from 'highcharts';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrl: './finance-dashboard.component.scss',
})
export class FinanceDashboardComponent {
  statusChart: Chart;
  totalBankTreasuriesChart: Chart;
  incomeChart: Chart;
  outgoingChart: Chart;
}
