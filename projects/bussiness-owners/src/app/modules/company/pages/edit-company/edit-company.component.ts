import { Component, OnInit } from '@angular/core';
import { RouterService, LookupsService, StorageService } from 'shared-lib';
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
  id: number;
  editTabName: any;
  get companyId(): string {
    return this.routerService.currentId;
  }


  ngOnInit() {
    this.currentTab = this.routerService.lastRouteSegement();
    this.getCompanyData();
    this.companyId;
  }

  activeTag(id: string) {
    // const targetElementId = document.getElementById(id);
    // var test = document.querySelector('.active_link');
    // test?.classList.remove('active_link');
    // targetElementId?.classList.add('active_link');
    this.currentTab = id;
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

  getCompanyData() {
    this.companyService.getCompanyById(this.companyId).subscribe((res) => {
      this.isActive = res.data.isActive;
      this.companyCode = res.data.code;
      this.companyName = res.data.name;
    });
  }
  constructor(
    private companyService: CompanyService,
    public lookupsService: LookupsService,
    private routerService: RouterService,
  ) {}
}
