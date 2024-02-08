import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.httpservice';
import { CompanyListResponse } from '../../models/company/companylist.response';
import { LanguageService } from '../../../../../shared-lib/src/lib/services/language.service';
import { RouterService } from '../../../../../shared-lib/src/lib/services/router.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  companies: CompanyListResponse[];

  constructor(
     private companyService : CompanyService,    
     private routerService: RouterService,
     public languageService: LanguageService
     ) {
      this.languageService.setLang();
      
  }
  navigateToAdd():void {
    this.routerService.navigateTo('company/add');
  }

  ngOnInit() {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.companies = res;
        console.log(this.companies)
      },
    });
  }
  
}




 