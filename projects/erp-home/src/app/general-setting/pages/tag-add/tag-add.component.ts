import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LoaderService, MenuModule, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';
import { AddTagDto } from '../../models';
@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {
  tagForm: FormGroup;
  modulelist: MenuModule[];
  

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public authService: AuthService,
    private ref: DynamicDialogRef,
    private generalSettingService : GeneralSettingService
  ) { }

  ngOnInit() {
    this.moudlelist();
    this.initializeTagForm();
  }

  moudlelist() {
    this.modulelist = this.authService.getModules();
    console.log(this.modulelist)
  }

  initializeTagForm() {
    this.tagForm = this.fb.group({
      Code: new FormControl({  value: '', disabled: true  }, customValidators.required),
      Name: new FormControl('', customValidators.required),
      ModuleIds: new FormControl([], customValidators.required)
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if(!this.tagForm.valid) return;
    const tagDto :AddTagDto=this.tagForm.value;
    this.generalSettingService.addTag(tagDto,this.ref);
    
  }
}
