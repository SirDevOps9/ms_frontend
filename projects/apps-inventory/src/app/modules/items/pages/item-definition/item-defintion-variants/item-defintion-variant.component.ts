import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService, lookupDto, MenuModule, PageInfo, PageInfoResult, RouterService, } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { itemDefinitionDto } from '../../../models';

@Component({
  selector: 'app-item-defintion-vat',
  templateUrl: './item-defintion-variant.component.html',
  styleUrls: ['./item-defintion-variant.component.scss']
})
export class ItemDefintionVariantComponent {

  tableData: any[] = [];
  exportColumns: lookupDto[] = [

  ];
  exportSelectedCols: string[] = [];
  exportData: itemDefinitionDto[] = [];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[] = [];
  searchTerm: string = '';
  id:number
  tableDataItemVariantsByI:any[]=[]
  currentLang:string = ''
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    public languageService: LanguageService,

  ) {

    this.id = this.route.snapshot.params['id'];
    this.currentLang = this.languageService.getLang();
  }

  ngOnInit() {
    this.fetchTableData();
    this.getItemVariants()
  }
  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItemDefinition('', pageInfo);
  }
  fetchTableData() {

  }

  onSearchChange() {
    this.fetchTableData();
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }

  exportBankData(searchTerm: string) {
    this.itemsService.exportsItemsDefinitionList(searchTerm);
    this.itemsService.exportedItemDefinitionListDataSource.subscribe((res) => {
      this.exportData = res;
    });
  }


  getItemVariants(){
    this.itemsService.getItemVariants(this.id)
    this.itemsService.ItemVariantsByIdObs.subscribe((data)=>{
    this.tableData = data
    })
  }
}
