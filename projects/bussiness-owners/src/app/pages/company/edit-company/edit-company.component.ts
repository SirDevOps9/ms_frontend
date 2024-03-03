import { Component, OnInit } from '@angular/core';
import { LogService, RouterService } from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { ResponseCompanyDto } from '../../../models/company/responsecompanydto';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
  providers: [RouterService],

})
export class EditCompanyComponent implements OnInit {

  constructor(
    private routerSerivce : RouterService,
    private companySerivce: CompanyService,
    private logService: LogService

  ) { }

  id: number;
  company:ResponseCompanyDto | null = null;
  ngOnInit() {
   this.id= this.routerSerivce.currentId;
   this.logService.log(this.id,"get by id response")

   this.companySerivce.getById(this.id)
   .subscribe((res) => {
    this.company = res.response;
    this.logService.log(this.company,"get by id response")
  });
  }

}
