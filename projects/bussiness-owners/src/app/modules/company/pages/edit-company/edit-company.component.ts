import { Component, OnInit } from '@angular/core';
import { RouterService, LookupsService } from 'shared-lib';

import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
  providers: [RouterService],
})
export class EditCompanyComponent implements OnInit {
  companyCode: string;
  companyName: string;
  planId: number;
  isActive: boolean = true;
  currentTab: string = 'address';
  editMode: boolean = false;

  get companyId(): string {
    //return '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
    console.log(   "From Edit Url" ,this.routerService.getCurrentUrl());
    
    console.log("From edit",this.routerService.currentId);

    return this.routerService.currentParetId;
  }

  id: number;
  editTabName: any;

  ngOnInit() {
    this.getCompanyData();
    this.companyId;
  }

  activeTag(id: any) {
    const targetElementId = document.getElementById(id);
    var test = document.querySelector('.active_link');
    test?.classList.remove('active_link');
    targetElementId?.classList.add('active_link');
  }
  navigateToAddress() {
    console.log(this.companyId);

    this.routerService.navigateTo(
      'company/edit/' + this.companyId + '/address'
    );
  }

  navigateToContact() {
    this.routerService.navigateTo(
      'company/edit/' + this.companyId + '/contact'
    );
  }

  navigateToLegal() {
    this.routerService.navigateTo('company/edit/' + this.companyId + '/legal');
  }

  navigateToHierarchy() {
    this.routerService.navigateTo(
      'company/edit/' + this.companyId + '/hierarchy'
    );
  }
  navigateToBranches() {
    this.routerService.navigateTo(
      'company/edit/' + this.companyId + '/branches'
    );
  }

  toggle() {
    if (!this.isActive) this.companyService.activate(this.companyId);
    else this.companyService.deactivate(this.companyId);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  switchToTab(tab: string) {
    this.currentTab = tab;
  }

  getCompanyData() {
    this.companyService.getCompanyById(this.companyId).subscribe((res) => {
      console.log('company by id', res);
      this.isActive = res.isActive;
      this.companyCode = res.code;
      this.companyName = res.name;
      //this.companyId = res.id;
    });
  }
  constructor(
    private companyService: CompanyService,
    public lookupsService: LookupsService,
    private routerService: RouterService
  ) {}
}
