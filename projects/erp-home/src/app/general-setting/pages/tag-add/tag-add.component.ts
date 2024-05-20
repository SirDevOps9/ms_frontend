import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LoaderService, MenuModule, customValidators } from 'shared-lib';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {
  TagForm: FormGroup;
  modulelist: MenuModule[];

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public authService: AuthService,
    private formService: FormsService,
    private ref: DynamicDialogRef,
    private loaderService: LoaderService,

  ) { }

  ngOnInit() {
    this.moudlelist();
    this.initializeTagForm();
  }

  moudlelist() {
    this.modulelist = this.authService.getModules();
  }

  initializeTagForm() {
    this.TagForm = this.fb.group({
      Code: new FormControl({ disabled: true }, customValidators.required),
      Name: new FormControl('', customValidators.required),
      ModuleId: new FormControl([], customValidators.required)
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formService.validForm(this.TagForm, true)) return;

    this.loaderService.show();
    this.userProxy.confirmInvitedUser(request).subscribe({
      next: (response) => {
        this.loaderService.hide();
        this.toasterService.showSuccess('Success', 'Success');
        let loginUrl = this.environmentService.erpLogin!;
        loginUrl = loginUrl.replace('*', subdomain);
        window.location.href = loginUrl;
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }
}
