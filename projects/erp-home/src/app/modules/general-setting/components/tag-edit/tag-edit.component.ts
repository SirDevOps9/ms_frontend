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
    return this.config?.data?.id;
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
    this.moudlelist();
    this.getCurruntTag();
     }


  getCurruntTag(){
    this.generalSettingService.getTagById(parseInt(this.Id) );
    this.generalSettingService.currentTag.subscribe((response) => {
      this.tagForm.patchValue({
        Id: response.id,
        Code: response.code,
        Name: response.name,
        ModulesId: response.modulesId,
        IsActive: response.isActive,
      });
      this.selectedModules = response.modulesId;
  });
}

  moudlelist() {
    this.modulelist = this.authService.getModules();
  }
  
  initializeTagForm() {
    this.tagForm = this.fb.group({
      Id: ['', customValidators.required],
      Code: [ '', customValidators.required],
      Name: ['', customValidators.required],
      ModulesId: [[], customValidators.required],
      IsActive: [false, customValidators.required]
    });
  }
  

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    console.log("onSubmit",this.tagForm.value)
    if(!this.tagForm.valid) return;
    const tagDto :TagDto=this.tagForm.value;
    this.generalSettingService.editTag(tagDto,this.ref);
    
  }
}
