import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Modules } from 'shared-lib';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  moduleName: string;
  items = new Array(4);

  data: any;
  options: any;

  data2: any;

  options2: any;
  products = [
    { code: 'P001', name: 'Apple', category: 'Fruits', quantity: 50 },
    { code: 'P002', name: 'Orange', category: 'Fruits', quantity: 75 },
    { code: 'P003', name: 'Carrot', category: 'Vegetables', quantity: 30 },
    { code: 'P004', name: 'Broccoli', category: 'Vegetables', quantity: 15 },
    { code: 'P005', name: 'Chicken', category: 'Meat', quantity: 100 }
  ];

  ngOnInit() {
    
    this.lineGraphMethod();

    this.pieChartMethod();

    if (this.router.snapshot.data['moduleId'] === Modules.Accounting)
      this.moduleName = 'Accounting';
    else if (this.router.snapshot.data['moduleId'] === Modules.Hr) this.moduleName = 'Hr';
    else if (this.router.snapshot.data['moduleId'] === Modules.Finance) this.moduleName = 'Finance';
    else if (this.router.snapshot.data['moduleId'] === Modules.Sales) this.moduleName = 'Sales';
    else if (this.router.snapshot.data['moduleId'] === Modules.Purchase)
      this.moduleName = 'Purchase';
    else if (this.router.snapshot.data['moduleId'] === Modules.GeneralSettings)
      this.moduleName = 'General Settings';

    this.titleService.setTitle(this.moduleName);
  }



  constructor(private router: ActivatedRoute, private titleService: Title) {}

  private lineGraphMethod() {
    const documentStyle2 = getComputedStyle(document.documentElement);
    const textColor = documentStyle2.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle2.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle2.getPropertyValue('--surface-border');

    this.data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle2.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle2.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    };

    this.options2 = {
      responsive: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  private pieChartMethod() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      // labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }
}
