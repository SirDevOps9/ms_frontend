import { Component, OnInit } from '@angular/core';
import {
  LogService,
  RouterService,
  LookupsService,
  LookupEnum,
  lookupDto,
} from 'shared-lib';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { CompanyProxy } from '../../company.proxy';
import {
  CountryDropDown,
  DropdownItemDto,
  MobileCodeDropdownDto,
  ResponseCompanyDto,
} from '../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
  providers: [RouterService],
})
export class EditCompanyComponent implements OnInit {
  planId: number;
  active: boolean = false;

  get companyId(): string {
    return this.routerService.currentId;
  }


  id: number;
  editTabName: any;
  
  ngOnInit() {}

  activeTag(id: any) {
    const targetElementId = document.getElementById(id);
    var test = document.querySelector('.active_link');
    test?.classList.remove('active_link');
    targetElementId?.classList.add('active_link');
  }

  constructor(
    private formBuilder: FormBuilder,
    private routerSerivce: RouterService,
    private companyProxy: CompanyProxy,
    private logService: LogService,
    private routerService: RouterService,
    public lookupsService: LookupsService,
    private route: ActivatedRoute
  ) {}
}
