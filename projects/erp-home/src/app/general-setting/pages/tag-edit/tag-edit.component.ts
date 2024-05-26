import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralSettingService } from '../../general-setting.service';
import { MenuModule, customValidators } from 'shared-lib';
import { TagDto } from '../../models/tagDto';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {
  tagForm: FormGroup;
  modulelist: MenuModule[];
  selectedModules:  number[] = [];
  get Id(): string {
    return this.config.data.Id;
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public authService: AuthService,
    private ref: DynamicDialogRef,
    private generalSettingService : GeneralSettingService
  ) { }

  ngOnInit() {
    this.initializeTagForm();
    this.modulelist = this.getStaticModuleList();
    this.getCurruntTag();
    //this.moudlelist();
     }

  getStaticModuleList(): MenuModule[] {
    return [
      { moduleId: 1, module: 'Module 1' },
      { moduleId: 2, module: 'Module 2' },
      { moduleId: 3, module: 'Module 3' }
    ];
  }

  getCurruntTag(){
    this.generalSettingService.getTagById(parseInt(this.Id) );
    this.generalSettingService.currentTag.subscribe((response) => {
      this.tagForm.patchValue({
        Id: response.id,
        Code: response.code,
        Name: response.name,
        ModuleIds: response.modulesId,
        IsActive: response.isActive,
        
      });
      this.selectedModules = response.modulesId;
      console.log("tag",this.tagForm);
  });
}

  moudlelist() {
    this.modulelist = this.authService.getModules();
  }
  
  initializeTagForm() {
    this.tagForm = this.fb.group({
      Id: ['', customValidators.required],
      Code: [{ value: '', disabled: true }, customValidators.required],
      Name: ['', customValidators.required],
      ModuleIds: [[], customValidators.required],
      IsActive: [false, customValidators.required]
    });
  }
  

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.tagForm.valid) return;
    const tagDto :TagDto=this.tagForm.value;
    this.generalSettingService.editTag(tagDto,this.ref);
    
  }
}
