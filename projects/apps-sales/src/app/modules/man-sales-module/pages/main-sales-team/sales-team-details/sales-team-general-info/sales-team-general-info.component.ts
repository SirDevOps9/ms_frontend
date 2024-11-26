import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { customValidators, RouterService, FormsService, SharedLibraryEnums } from 'shared-lib';

@Component({
  selector: 'app-sales-team-general-info',
  templateUrl: './sales-team-general-info.component.html',
  styleUrl: './sales-team-general-info.component.scss',
})
export class SalesTeamGeneralInfoComponent implements OnInit {
  id: number;
  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [customValidators.required]],
    });
  }
  constructor(
    private _router: RouterService,
    private fb: FormBuilder,
    private formService: FormsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  onCancel() {
    this._router.navigateTo('/masterdata/sales-team');
  }
  onSave() {
    if (!this.formService.validForm(this.formGroup, false)) return;
  }
}
