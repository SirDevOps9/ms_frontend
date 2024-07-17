import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modules } from 'shared-lib';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  moduleName: string;
  apps = [
    {
      name: 'Sales Management',
      description: 'Manage your sales and customer relationships.',
      icon: 'bi bi-briefcase',
      link: '/sales',
    },
    {
      name: 'Inventory Control',
      description: 'Track and manage your inventory effectively.',
      icon: 'bi bi-box',
      link: '/inventory',
    },
    {
      name: 'Finance Management',
      description: 'Handle your financial operations with ease.',
      icon: 'bi bi-currency-dollar',
      link: '/finance',
    },
    // Add more apps as needed
  ];

  ngOnInit() {
    console.log('Landing Page');

    if (this.router.snapshot.data['moduleId'] === Modules.Accounting)
      this.moduleName = 'Accounting';
    else if (this.router.snapshot.data['moduleId'] === Modules.Hr) this.moduleName = 'Hr';
    else if (this.router.snapshot.data['moduleId'] === Modules.GeneralSettings)
      this.moduleName = 'General Settings';
  }

  constructor(private router: ActivatedRoute) {}
}
