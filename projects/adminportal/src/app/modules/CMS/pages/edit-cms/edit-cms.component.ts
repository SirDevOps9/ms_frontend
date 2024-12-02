import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LayoutService } from 'apps-shared-lib';
import { RouterService, FormsService, customValidators } from 'shared-lib';
import { CMSService } from '../../cms.service';
import { AddCMS } from '../../models/cms';

@Component({
  selector: 'app-edit-cms',
  templateUrl: './edit-cms.component.html',
  styleUrl: './edit-cms.component.scss',
})
export class EditCMSComponent {
  formGroup: FormGroup;
  text: string = ''; // Editor content as string
  rowId: number;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],

    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  constructor(
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private routerService: RouterService,
    private formService: FormsService,
    private _helpPageService: CMSService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.rowId = Number(this._route.snapshot.params['id']);
    this.initForm();

    if (this.rowId) {
      this.getCMSById(this.rowId);
    }
  }

  initForm() {
    this.formGroup = this.fb.group({
      titleAr: new FormControl('', customValidators.required),
      titleEn: new FormControl('', customValidators.required),
      contentEn: new FormControl('', customValidators.required),
      contentAr: new FormControl('', customValidators.required),
      descriptionAr: [''],
      descriptionEn: [''],
    });
  }

  discard() {
    this.routerService.navigateTo('/help-cms');
  } 

  getCMSById(id: number) {
    this._helpPageService.getCMSById(id);
    this._helpPageService.helpPageObj$.subscribe((res: any) => {
      if (Object.keys(res).length) {
        this.formGroup.patchValue({
          titleAr: res.titleAr,
          titleEn: res.titleEn,
          descriptionAr: res.descriptionAr,
          descriptionEn: res.descriptionEn,
          contentAr: res.contentAr,
          contentEn: res.contentEn,
        });
      }
    });
  }

  onSave() {
    if (!this.formService.validForm(this.formGroup, false)) return;
    let formVal = this.formGroup.value;
    let obj = {
      titleAr: formVal.titleAr,
      titleEn: formVal.titleEn,
      descriptionAr: formVal.descriptionAr,
      descriptionEn: formVal.descriptionEn,
      contentAr: formVal.contentAr,
      contentEn: formVal.contentEn,
    } as AddCMS;

    this._helpPageService.updateCMS(this.rowId, obj);
  }
}
