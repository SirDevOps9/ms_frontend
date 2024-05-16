import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { GetLevelsDto } from '../../models/getLevelsDto';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AddLevelsDto, listAddLevelsDto } from '../../models/addLevelsDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';

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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fa = this.fb.array([]);

    this.initChartOfAccountData();
  }

  initChartOfAccountData() {
    this.accountService.getLevels().subscribe({
      next: (ChartOfAccountList: any) => {        
       // this.fa.patchValue(ChartOfAccountList);
         this.tableData = ChartOfAccountList;
         this.tableData.forEach((level: GetLevelsDto) => {
           this.fa.push(this.createLevelFormGroup(level));
         });
      },
    });
  }
  
  createLevelFormGroup(level: GetLevelsDto): FormGroup {
    return this.fb.group({
      levelNumber: [level.levelNumber],
      name: [level.name],
      numberOfDigits: [level.numberOfDigits],
      id: [level.id]
    });
  }

  save() {
    const formData = this.fa.value;
    let mappedData: listAddLevelsDto = { levels: formData};
    console.log(mappedData, 'sandra');
    this.accountService.addLevels(mappedData).subscribe({
      next: (ChartOfAccountList: any) => {},
    });
  }

  close() {
    this.ref.close();
  }

  addline() {
    const fg = this.fb.group({
      name: new FormControl(null, customValidators.required),
      levelNumber: new FormControl('', customValidators.required),
      numberOfDigits: new FormControl('', customValidators.required),
      id: null,
    });
    this.fa.push(fg);
  }
}
