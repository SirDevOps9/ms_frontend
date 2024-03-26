import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { AppDto } from '../../models/appDto';
import { BaseDto, SubdomainService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-list-apps',
  templateUrl: './list-apps.component.html',
  styleUrl: './list-apps.component.scss'
})
export class ListAppsComponent implements OnInit {
  apps: AppDto[];
  subdomains: BaseDto[];
  cardList:boolean=false;

  constructor(private appStoreService: AppStoreService,
    private dialog: DialogService,
    private subdomainService: SubdomainService) {
  }

  ngOnInit(): void {
    this.apps=[
      {
        id: 1,
        name: "Finance",
        description: "test ",
        logoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        price: {
          amount: 0,
          currencyId: 3,
          currencyName: "EGP"
        },
    dependencies: []
      },
      {
        id: 1,
        name: "Finance",
        description: "test ",
        logoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        price: {
          amount: 0,
          currencyId: 3,
          currencyName: "EGP"
        },
    dependencies: []
      }
    ]
    this.appStoreService.loadApps();
    this.appStoreService.apps.subscribe(apps => {
      //this.apps = apps;
    });
    this.subdomainService.getAllSubdomains().subscribe(s => this.subdomains = s);
  }

  addToCart(appId: number) {
    this.appStoreService.addToCart(appId, this.dialog, this.subdomains);
  }

  getAppDeps(app: AppDto) {
    return app.dependencies.map(d => d.name).join(" - ");
  }
  card(){
    this.cardList=true
  }
  row(){
    this.cardList=false

  }
  routeToDetails(id:any){
    console.log(id);
    
  }
}
