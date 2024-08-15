import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { GetLevelsDto } from '../../models/getLevelsDto';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { listAddLevelsDto } from '../../models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, LanguageService,FormsService } from 'shared-lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chart-of-account-configuration',
  templateUrl: './chart-of-account-configuration.component.html',
  styleUrls: ['./chart-of-account-configuration.component.scss'],
})
export class ChartOfAccountConfigurationComponent implements OnInit {
  tableData: GetLevelsDto[];
  fa: FormArray;

  constructor(
    private accountService: AccountService,
    private ref: DynamicDialogRef,
    private title: Title,
    private langService: LanguageService,
    private fb: FormBuilder,
    private formService: FormsService
  ) {
    this.title.setTitle(this.langService.transalte('ChartOfAccount.ChartOfAccountConfig'));

  }

  ngOnInit() {
    this.fa = this.fb.array([]);

    this.initChartOfAccountData();
  }

  initChartOfAccountData() {
    this.accountService.getLevels();
    this.accountService.levels.subscribe((response) => {
      this.tableData = response;
      this.tableData.forEach((level: GetLevelsDto) => {
        this.fa.push(this.createLevelFormGroup(level));
      });
    });
  }


  createLevelFormGroup(level: GetLevelsDto): FormGroup {
    return this.fb.group({
      levelNumber: [level.levelNumber],
      name: [level.name],
      numberOfDigits: [level.numberOfDigits],
      id: [level.id],
    });
  }

  save() {
    if (!this.formService.validForm(this.fa, false)) return;
    const formData = this.fa.value;
    let mappedData: listAddLevelsDto = { levels: formData };
    this.accountService.addLevels(mappedData, this.fa);
    this.ref.close();
  }

  close() {
    this.ref.close();
  }

  addline() {
    const fg = this.fb.group({
      name: new FormControl(null, customValidators.required),
      levelNumber: new FormControl(null, customValidators.required),
      numberOfDigits: new FormControl(null, customValidators.required),
      id: null,
    });
    if (!this.formService.validForm(this.fa, false)) return;
    this.fa.push(fg);
  }
}
