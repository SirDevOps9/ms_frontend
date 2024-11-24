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
      title: new FormControl('', customValidators.required),
      isDraft: new FormControl(false),
      sefName: new FormControl('', customValidators.required),
      serviceId: new FormControl(null, customValidators.required),
      content: new FormControl('', customValidators.required),
      description: [''],
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
          title: res.title,
          isDraft: res.isDraft,
          sefName: res.sefName,
          serviceId: res.serviceId,
          content: res.helpPageDetails.content,
          description: res.helpPageDetails.description,
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
      title: formVal.title,
      isDraft: formVal.isDraft,
      sefName: formVal.sefName,
      serviceId: formVal.serviceId,
      helpPageDetails: {
        content: formVal.content,
        description: formVal.description,
      },
    } as AddHelpPage;

    this._helpPageService.updateHelpPage(this.rowId, obj);

    // this._helpPageService.updateHlpPage$.subscribe((res: any) => {
    // });
  }
}
