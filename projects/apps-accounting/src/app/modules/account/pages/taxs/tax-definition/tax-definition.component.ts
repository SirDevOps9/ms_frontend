import { TaxDefinitionAddComponent } from './../../../components/tax-definition-add/tax-definition-add.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { GeneralSettingService } from 'projects/erp-home/src/app/modules/general-setting/general-setting.service';
import { TagDto } from 'projects/erp-home/src/app/modules/general-setting/models';
import { PageInfoResult, MenuModule, RouterService, PageInfo } from 'shared-lib';
import { TaxDefinitionEditComponent } from '../../../components/tax-definition-edit/tax-definition-edit.component';


@Component({
  selector: 'app-tax-definition',
  templateUrl: './tax-definition.component.html',
  styleUrl: './tax-definition.component.scss'
})
export class TaxDefinitionComponent implements OnInit {
  tableData: TagDto[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;

  constructor(
    private routerService: RouterService,
    private generalSettingService: GeneralSettingService,
    public authService: AuthService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.modulelist = this.authService.getModules();
    this.initTagData();
  }

  initTagData() {
    this.generalSettingService.getTagList('', new PageInfo());

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getTagList('', pageInfo);

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }


  changed(e: any, id: number) {
    if (e.checked === false) {
      this.generalSettingService.deactivate(id);
    } else {
      this.generalSettingService.activate(id);
    }
  }

  onAdd() {
    const dialogRef = this.dialog.open(TaxDefinitionAddComponent, {
      width: '600px',
      height : '800px'
    
    });

    dialogRef.onClose.subscribe(() => {
      this.initTagData();
    });
  }

  onSearchChange() {
    this.generalSettingService.getTagList(this.searchTerm, new PageInfo());

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  Delete(id: number) {
    this.generalSettingService.deleteTag(id);
    const index = this.tableData.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.tableData.splice(index, 1);
    }
  }
}
