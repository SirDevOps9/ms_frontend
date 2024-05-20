import { Component, OnInit } from '@angular/core';
import { MenuModule, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';
import { TagDto } from '../../models/TagDto';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';
import { AuthService } from 'microtec-auth-lib';
import { TagAddComponent } from '../tag-add/tag-add.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tableData: TagDto[];
  currentPageInfo: PageInfoResult;
  modulelist : MenuModule[];
  
  constructor(private routerService: RouterService, 
    private generalSettingService: GeneralSettingService
    ,public authService: AuthService
    ,private dialog: DialogService
  ) {}

  ngOnInit() {
    this.initChartOfAccountData();
    this.modulelist =this.authService.getModules()
  }

  initChartOfAccountData() {
    this.generalSettingService.initTagList('', new PageInfo());

    this.generalSettingService.TagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  
  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getAllTagsPaginated('', pageInfo);
  }

  routeToAdd() {
    const dialogRef = this.dialog.open(TagAddComponent, {
      width: '800px',
      height: '700px'
    });  
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(`/journalentry/edit/${id}`);
  }


  changed($event: InputSwitchChangeEvent,arg1: any) {
    throw new Error('Method not implemented.');

    }

  NewTag(){
     const dialogRef = this.dialog.open(TagAddComponent, {
      width: '800px',
      height: '700px'
    });  
    }


}
