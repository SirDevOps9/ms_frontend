import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from 'apps-shared-lib';
import { RouterService, FormsService, customValidators } from 'shared-lib';
import { HelpPageService } from '../../help-page.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddHelpPage } from '../../models/heloPage';

@Component({
  selector: 'app-edit-helps-pages',
  templateUrl: './edit-helps-pages.component.html',
  styleUrls: ['./edit-helps-pages.component.scss'],
})
export class EditHelpsPagesComponent implements OnInit {
  formGroup: FormGroup;
  text: string = ''; // Editor content as string
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
  isDisabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private routerService: RouterService,
    private formService: FormsService,
    private _helpPageService: HelpPageService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.rowId = Number(this._route.snapshot.params['id']);
    this.initForm();

    if (this.rowId) {
      this.getPageById(this.rowId);
    }
  }

  initForm() {
    this.formGroup = this.fb.group({
      nameEn: new FormControl(''),
      nameAr: new FormControl(''),
      title: new FormControl('', customValidators.required),
      titleAr: new FormControl('', customValidators.required),
      serviceId: new FormControl(this.rowId, customValidators.required),
      content: new FormControl('', customValidators.required),
      contentAr: new FormControl('', customValidators.required),
    });
  }

  discard() {
    this.routerService.navigateTo('/help-pages');
  }

  getPageById(id: number) {
    this._helpPageService.getPageById(id);
    this._helpPageService.helpPageObj$.subscribe((res: any) => {
      if (Object.keys(res).length && res.helpPageDetails) {
        this.formGroup.patchValue({
          nameEn: res.nameEn,
          nameAr: res.nameAr,
          title: res.titleEn,
          titleAr: res.titleAr,
          serviceId: res.serviceId,
          content: res.helpPageDetails.contentEn,
          contentAr: res.helpPageDetails.contentAr,
        });
      }
    });
  }

  onContentChange(event: any) {
    this.text = event; // Update text content
    this.formGroup.get('helpPageDetails.content')?.setValue(this.text); // Sync form control
  }


  onSave() {
    if (!this.formService.validForm(this.formGroup, false)) return;
    let formVal = this.formGroup.value;
    let obj = {
      nameEn: formVal.nameEn,
      nameAr: formVal.nameAr,
      titleEn: formVal.title,
      titleAr: formVal.titleAr,
      serviceId: formVal.serviceId,
      helpPageDetails: {
        contentEn: formVal.content,
        contentAr: formVal.contentAr,
      },
    } as AddHelpPage;

    this._helpPageService.updateHelpPage(this.rowId, obj);

    // this._helpPageService.updateHlpPage$.subscribe((res: any) => {
    // });
  }
}
