import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { RouterService, FormsService, customValidators } from 'shared-lib';
import { HelpPageService } from '../../help-page.service';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddHelpPage } from '../../models/heloPage';

@Component({
  selector: 'app-add-help-page',
  templateUrl: './add-help-page.component.html',
  styleUrl: './add-help-page.component.scss',
})
export class AddHelpPageComponent implements OnInit {
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
    private _helpPageService: HelpPageService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.rowId = Number(this._route.snapshot.params['id']);

    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
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

  onSave() {
    if (!this.formService.validForm(this.formGroup, false)) return;

    let formVal = this.formGroup.value;
    let obj = {
      titleEn: formVal.title,
      titleAr: formVal.titleAr,
      serviceId: formVal.serviceId,
      helpPageDetails: {
        contentEn: formVal.content,
        contentAr: formVal.contentAr,
      },
    } as AddHelpPage;
    this._helpPageService.sendHelpPage(obj);
  
  }
}

