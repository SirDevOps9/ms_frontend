import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { AppDto } from '../../models/appDto';
import { BaseDto, SubdomainService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  templateUrl: './card-apps.component.html',
  styleUrl: './card-apps.component.scss'
})
export class CardAppsComponent implements OnInit {
  apps: AppDto[];
  subdomains: BaseDto[];

  constructor(private appStoreService: AppStoreService,
    private dialog: DialogService,
    private subdomainService: SubdomainService) {
  }

  ngOnInit(): void {
    this.appStoreService.loadApps();
    this.appStoreService.apps.subscribe(apps => {
      this.apps = apps;
    });
    this.subdomainService.getAllSubdomains().subscribe(s => this.subdomains = s);
  }

  addToCart(appId: number) {
    this.appStoreService.addToCart(appId, this.dialog, this.subdomains);
  }

  getAppDeps(app: AppDto) {
    return app.dependencies.map(d => d.name).join(" - ");
  }
}
