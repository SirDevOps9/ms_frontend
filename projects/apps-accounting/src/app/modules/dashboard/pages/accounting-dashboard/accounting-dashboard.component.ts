import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-accounting-dashboard',
  templateUrl: './accounting-dashboard.component.html',
  styleUrl: './accounting-dashboard.component.scss',
})
export class AccountingDashboardComponent {
  constructor() {}

  ngOnInit() {
    console.log('init dashboard');
  }

  chart = new Chart({
    chart: {
      type: 'column',
    },
    title: {
      text: '',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    xAxis: {
      categories: ['Draft', 'Unposted', 'Posted', 'Unbalanced', 'Canceled'],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      tickInterval: 200,
      title: {
        text: null,
      },
    },

    tooltip: {
      valueSuffix: ' (USD)',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        type: 'column',
        name: '',
        data: [
          { y: 600, color: '#5eb5af' },
          { y: 400, color: '#d66457' },
          { y: 700, color: '#e7994f' },
          { y: 400, color: '#80d657' },
          { y: 700, color: '#e750b5' },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  chartConfig = [
    { y: 600, color: '#5eb5af', name: 'Draft' },
    { y: 400, color: '#d66457', name: 'Unposted' },
    { y: 700, color: '#e7994f', name: 'Posted' },
    { y: 400, color: '#80d657', name: 'Unbalanced' },
    { y: 700, color: '#e750b5', name: 'Canceled' },
  ];

  journalSourcesChart = new Chart({
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    tooltip: {
      valueSuffix: ' (%)',
    },
    plotOptions: {
      pie: {
        innerSize: '70%',
      },
    },
    series: [
      {
        type: 'pie',
        name: '',
        data: [
          { y: 50, color: '#5eb5af', name: 'Manual' },
          { y: 50, color: '#d66457', name: 'Finance' },
          { y: 50, color: '#e7994f', name: 'Purchase' },
          { y: 50, color: '#80d657', name: 'Sales' },
          { y: 50, color: '#e750b5', name: 'Inventory' },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  });

  journalConfig = [
    { y: 50, color: '#5eb5af', name: 'Manual' },
    { y: 50, color: '#d66457', name: 'Finance' },
    { y: 50, color: '#e7994f', name: 'Purchase' },
    { y: 50, color: '#80d657', name: 'Sales' },
    { y: 50, color: '#e750b5', name: 'Inventory' },
  ];

  accounts: any = [
    {
      name: 'account name',
      type: 'cache',
      value: '100,000',
    },
    {
      name: 'account name',
      type: 'Bank',
      value: '100,000',
    },
    {
      name: 'account name',
      type: 'cache',
      value: '100,000',
    },
    {
      name: 'account name',
      type: 'cache',
      value: '100,000',
    },
  ];
}
