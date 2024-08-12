import { Component, OnInit } from '@angular/core';
import { lookupDto, LanguageService, MenuModule, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { LayoutService } from 'libs/apps-shared-lib/src/lib/modules/layout/layout.service';
import { GeneralSettingService } from '../../../general-setting.service';
import { ExportTagDto, TagDto } from '../../../models';
import { TagEditComponent } from '../../../components/tag-edit/tag-edit.component';
import { TagAddComponent } from '../../../components/tag-add/tag-add.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  tableData: TagDto[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;

  mappedExportData: TagDto[];
  exportData: ExportTagDto[]; 

  constructor(
    private routerService: RouterService,
    private generalSettingService: GeneralSettingService,
    public layoutService: LayoutService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private title: Title,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('tag.taglist'));

  }

   exportColumns: lookupDto[] = [
    {
      id: 'id',
      name: 'Id',
    },
    {
      id: 'code',
      name: 'Code',
    },
    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'isActive',
      name: 'Status',
    },
    {
      id: 'modules',
      name: 'Modules',
    },
  ];
  ngOnInit() {

    this.modulelist = this.layoutService.getModules();
    console.log(this.modulelist)
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

  viewModulesName(tag : number[]) {
    let moduleName : any = this.modulelist
    moduleName = moduleName.filter((elem : any)=> tag.includes(elem.moduleId)).map((elem : any)=>elem.module)
    return moduleName

  }

  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getTagList('', pageInfo);

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  routeToEdit(data: any) {
    const dialogRef = this.dialog.open(TagEditComponent, {
      header : this.languageService.transalte('tag.EditTag'),
      width: '800px',
      position: 'bottom-right' ,// A
      data : data
    });

    dialogRef.onClose.subscribe(() => {
      this.initTagData();
    });
  }

  changed(e: any, id: number) {
    if (e.checked === false) {
      this.generalSettingService.deactivate(id);
    } else {
      this.generalSettingService.activate(id);
    }
  }

  newTag() {
    const dialogRef = this.dialog.open(TagAddComponent, {
      header : this.languageService.transalte('tag.AddNewTag'),
      width: '600px',
      position: 'bottom-right' // Adjust position as needed
    
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

  exportTagData(searchTerm: string) {
    this.generalSettingService.exportTagData(searchTerm);
    this.generalSettingService.exportsTagDataSourceObservable.subscribe((res) => {
      this.exportData = res;

    });
  }

  Delete(id: number) {
    this.generalSettingService.deleteTag(id);
   
    
    
  }
}