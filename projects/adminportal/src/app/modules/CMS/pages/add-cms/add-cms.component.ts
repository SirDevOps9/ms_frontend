import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LayoutService } from 'apps-shared-lib';
import { RouterService, FormsService, customValidators } from 'shared-lib';
import { CMSService } from '../../cms.service';
import { AddCMS } from '../../models/cms';

@Component({
  selector: 'app-add-cms',
  templateUrl: './add-cms.component.html',
  styleUrl: './add-cms.component.scss'
})
export class AddCMSComponent {
  formGroup: FormGroup;
  text: any;
  rowId: number;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '50rem',
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
    this._helpPageService.sendCMS(obj);
  
  }
}

