import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { AppDto } from '../../models/appDto';
import { BaseDto, SharedLibraryEnums, SubdomainService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { UserService } from '../../../user/user.service';
import { Actions, Apps, Licenses, RouteFilter } from 'microtec-auth-lib';
@Component({
  selector: 'app-list-apps',
  templateUrl: './list-apps.component.html',
  styleUrl: './list-apps.component.scss',
})
export class ListAppsComponent implements OnInit {
  apps: AppDto[];
  subdomains: BaseDto[];
  cardList: boolean = false;
  constructor(
    private appStoreService: AppStoreService,
    private dialog: DialogService,
    private subdomainService: SubdomainService,
    public sharedLibraryEnums: SharedLibraryEnums,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.testTree();

    this.appStoreService.loadApps();
    this.appStoreService.apps.subscribe((apps) => {
      this.apps = apps;
    });
    this.subdomainService
      .getAllSubdomains()
      .subscribe((s) => (this.subdomains = s));
  }

  addToCart(appId: number) {
    this.appStoreService.addToCart(appId, this.dialog, this.subdomains);
  }

  getAppDeps(app: AppDto) {
    return app.dependencies.map((d) => d.name).join(' - ');
  }
  card() {
    this.cardList = true;
  }
  row() {
    this.cardList = false;
  }
  routeToDetails(id: any) {
    console.log(id);
  }
}
