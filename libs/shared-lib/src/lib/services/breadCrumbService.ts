import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private array: any[] = [];
  private route: string = "";

  constructor() { }

  setArray(arr: any[] ): void {
    this.array = arr;
  }
  setRouteHome( route:string): void {
    this.route = route 
  }

  getArray(): any[] {
    return this.array;
  }
  getRouteHome():string {
    return this.route;
  }
}
