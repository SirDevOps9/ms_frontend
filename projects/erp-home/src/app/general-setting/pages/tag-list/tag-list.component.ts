import { Component, OnInit } from '@angular/core';
import { MenuModule, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';
import { TagDto } from '../../models';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';
import { AuthService } from 'microtec-auth-lib';
import { TagAddComponent } from '../tag-add/tag-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TagEditComponent } from '../tag-edit/tag-edit.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tableData: TagDto[];
  currentPageInfo: PageInfoResult;
  modulelist : MenuModule[];
  searchTerm: string;
  
  constructor(private routerService: RouterService, 
    private generalSettingService: GeneralSettingService
    ,public authService: AuthService
    ,private dialog: DialogService
  ) {}

  ngOnInit() {
    this.initTagData();
    this.modulelist =this.authService.getModules();
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
  routeToEdit(id: number) {
    const dialogRef = this.dialog.open(TagEditComponent, {
      width: '800px',
      height: '700px',
      data:{Id:id},
    });  
    
    dialogRef.onClose.subscribe(() => {
      this.initTagData();
    });
  }


  changed(e: InputSwitchChangeEvent,id: number) {
      if (e.checked === true) {
        this.generalSettingService.deactivate(id);
      } else {
        this.generalSettingService.activate(id);
      }

    }

  newTag(){
     const dialogRef = this.dialog.open(TagAddComponent, {
      width: '800px',
      height: '700px'
    });  
    
    dialogRef.onClose.subscribe(() => {
      this.initTagData();
    });
    }

    onSearchChange(){
      this.generalSettingService.getTagList(this.searchTerm, new PageInfo());

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
    }
    Delete(id:number){
      this.generalSettingService.deleteTag(id);
      const index = this.tableData.findIndex(item => item.id === id);
        if (index !== -1) {
         this.tableData.splice(index, 1);
        }
    }

}
