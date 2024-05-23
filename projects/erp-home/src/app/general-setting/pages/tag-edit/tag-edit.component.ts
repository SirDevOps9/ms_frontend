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
  TagForm: FormGroup;
  modulelist: MenuModule[];
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
    this.modulelist = this.getStaticModuleList();
    //this.moudlelist();
    this.initializeTagForm();
    this.getCurruntTag();
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
      this.TagForm.patchValue({
        Id: response.id,
        Code: response.code,
        Name: response.name,
        ModuleIds: response.modulesId,
        IsActive: response.isActive
      });
      console.log("tag",this.TagForm);
  });
}

  moudlelist() {
    this.modulelist = this.authService.getModules();
  }
  
  initializeTagForm() {
    this.TagForm = this.fb.group({
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
    if (!this.TagForm.valid) return;
    const tagDto :TagDto=this.TagForm.value;
    this.generalSettingService.editTag(tagDto,this.ref);
    
  }
}
