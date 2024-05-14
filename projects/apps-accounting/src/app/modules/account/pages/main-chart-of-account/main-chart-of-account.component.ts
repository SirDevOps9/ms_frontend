import { Component } from '@angular/core';

@Component({
  selector: 'app-main-chart-of-account',
  templateUrl: './main-chart-of-account.component.html',
  styleUrl: './main-chart-of-account.component.scss'
})
export class MainChartOfAccountComponent {
  listView:boolean=false;
  toggleView(){
    this.listView=!this.listView
  }
}
