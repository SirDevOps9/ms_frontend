import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { AppDto } from '../../models/appDto';

@Component({
  selector: 'app-list-apps',
  templateUrl: './list-apps.component.html',
  styleUrl: './list-apps.component.scss'
})
export class ListAppsComponent implements OnInit {
  apps: AppDto[];
  selectedIds: number[] = [];
  state: boolean[] = [];
  readonlyIds: number[] = [];
  dependentIds: number[] = [];

  constructor(private appStoreService: AppStoreService) {
  }

  ngOnInit(): void {
    this.appStoreService.loadApps();
    this.appStoreService.apps.subscribe(apps => {
      this.apps = apps;
      apps.forEach(app => {
        this.state[app.id] = false;
      });
    });
  }

  checkDependency(id: number) {
    this.state[id] = true;
    this.dependentIds.push(id);
    if (!this.readonlyIds.includes(id)) {
      this.readonlyIds.push(id);
    }
    const depencyIds = this.apps.find(app => app.id == id)!.dependencies.map(d => d.id);
    depencyIds.forEach(depencyId => {
      this.checkDependency(depencyId);
    });
  }

  onChecked(id: number, value: boolean) {
    //set the value
    this.state[id] = value;
    const depencyIds = this.apps.find(app => app.id == id)!.dependencies.map(d => d.id);
    if (value) {
      //get dependencies
      depencyIds.forEach(depencyId => {
        this.checkDependency(depencyId);
      });
    } else {
      depencyIds.forEach(depencyId => {
        this.removeFromList(this.dependentIds, depencyId);
      });
      this.readonlyIds = this.readonlyIds.filter(readonlyId => this.dependentIds.includes(readonlyId));
    }
  }


  public get total(): number {
    return this.apps.reduce(
      (sum, app) => sum + (this.state[app.id] ? app.price.amount : 0),
       0);
  }


  private removeFromList(list: any[], item: any) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }
}
