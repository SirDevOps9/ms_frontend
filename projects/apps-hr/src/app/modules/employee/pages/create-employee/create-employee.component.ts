import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  LookupEnum,
  LookupsService,
  customValidators,
  lookupDto,
} from 'shared-lib';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  LookupEnum = LookupEnum;
  employeeCode: string = 'dsdf';
  lookups: { [key: string]: lookupDto[] };
  ngOnInit() {
    this.initializeForm();
    this.loadLookups();
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Gender,
      LookupEnum.MaritalStatus,
      LookupEnum.Religion,
      LookupEnum.MilitaryStatus,
      LookupEnum.BloodType,
    ]);
  }
  private initializeForm() {
    this.addEmployeeForm = this.formBuilder.group({
      employeeCode: new FormControl('', [customValidators.required]),
      attendanceCode: new FormControl('', [customValidators.required]),
      employeeName: new FormControl('', [customValidators.required]),
      employeePhoto: new FormControl(''),
      birthDate: new FormControl('', [customValidators.required]),
      countryOfBirth: new FormControl('', [customValidators.required]),
      birthCity: new FormControl('', [customValidators.required]),
      nationality: new FormControl('', [customValidators.required]),
      gender: new FormControl('', [customValidators.required]),
      maritalStatus: new FormControl('', [customValidators.required]),
      religion: new FormControl('', [customValidators.required]),
      militaryStatus: new FormControl('', [customValidators.required]),
      militaryNumber: new FormControl(''),
      bloodType: new FormControl(''),
      withSpecialNeeds: new FormControl(false),
    });
  }

  onSubmit() {}
  Discard() {}
  
  constructor(
    public lookupsService: LookupsService,
    private formBuilder: FormBuilder
  ) {}
}
