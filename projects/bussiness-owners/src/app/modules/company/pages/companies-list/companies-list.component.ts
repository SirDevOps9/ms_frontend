import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService, RouterService  } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { ResponseCompanyDto } from '../../models';
import { CompanyService } from '../../company.service';
import { TreeNode } from 'primeng/api'; 

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss',
  providers: [RouterService],
})
export class CompaniesListComponent implements OnInit {
  companies: ResponseCompanyDto[];
  @ViewChild('myTab') myTab: any | undefined;
  selectedCompanies: ResponseCompanyDto[];
  tableData: TreeNode[] = []; 
  cols: any[] = []; 
  active:boolean=false
  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private companyService: CompanyService,
  ) {}

  navigateToAdd(): void {
    this.routerService.navigateTo('company/new/' + this.subscriptionId);
  }

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('Company.CompanyList')
    );
    this.initCompanyData();  

    this.cols = [ 
      {  
          field: 'Code',  
          header: 'Code' 
      }, 
      {  
          field: 'Companies Name',  
          header: 'Name' 
      }, 
      {  
          field: 'Companies Type',  
          header: 'Type' 
      }, 
      {  
          field: 'Tax ID',  
          header: 'ID' 
      }, 
      {  
          field: 'Commercial ID',  
          header: 'CommercialID' 
      }, 
      {  
          field: 'Phone',  
          header: 'Phone' 
      }, 
      {  
          field: 'status',  
          header: 'status' 
      }, 
      {  
          field: 'Actions',  
          header: 'Actions' 
      }, 
    
    ]; 
    this.tableData = [ 
    { 
        data: { 
            Code: 'David', 
            CompaniesName: 'dddddd', 
            Type: 'pppppppp', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            
        }, 
        children: [ 
            { 
                data: { 
                    Code: 'David', 
                    Name: '40', 
                    Type: '40', 
                    ID: '40', 
                    CommercialID: '40', 
                    Phone: '40', 
                    
                    
                }, 
                children: [ 
                    { 
                        data: { 
                            Code: 'David', 
                            Name: '40', 
                            Type: '40', 
                            ID: '40', 
                            CommercialID: '40', 
                            Phone: '40', 
                            
                          
                        }, 
                    }, 
                    { 
                        data: { 
                            Code: 'David', 
                            Name: '40', 
                            Type: '40', 
                            ID: '40', 
                            CommercialID: '40', 
                            Phone: '40', 
                            
                          
                        }, 
                    }, 
                ], 
            }, 
            { 
                data: { 
                    Code: 'David', 
                    Name: '40', 
                    Type: '40', 
                    ID: '40', 
                    CommercialID: '40', 
                    Phone: '40', 
                    
                  
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            
        }, 
        children: [ 
            { 
                data: { 
                    Code: 'David', 
                    Name: 'ssssssssss', 
                    Type: 'sssssssss', 
                    ID: 'ssssssss', 
                    CommercialID: '40', 
                    Phone: '40', 
                    
                    Actions: '40',
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Max', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Max', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Max', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Max', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Max', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Max', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Max', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Willy', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Miley', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'Sam', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
    { 
        data: { 
            name: 'James', 
            age: '55', 
        }, 
        children: [ 
            { 
                data: { 
                    name: 'Michelle', 
                    age: '20', 
                }, 
            }, 
            { 
                data: { 
                       Code: 'David', 
            Name: '40', 
            Type: '40', 
            ID: '40', 
            CommercialID: '40', 
            Phone: '40', 
            
            Actions: '40',
                }, 
            }, 
        ], 
    }, 
]; 

  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.myTab.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  initCompanyData() {
    //this.companyService.loadCompanies(this.subscriptionId);

    this.companyService.companies.subscribe((companyList) => {
      this.companies = companyList;
    });
  }
  toggle(id: number, isActive: boolean) {
    if (!isActive) this.companyService.activate(id);
    else this.companyService.deactivate(id);
  }

  changed(e: any, id: number) {
    if (e.checked === false) {
      this.companyService.deactivate(id);
    } else {
      this.companyService.activate(id);
    }
  }

  get subscriptionId(): string {
    return this.routerService.currentId;
  }
 
}
