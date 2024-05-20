import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  AgeService,
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { EmployeeService } from '../../employee.service';
import { EditEmployeePersonal } from '../../models';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  providers: [RouterService],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: FormGroup;
  LookupEnum = LookupEnum;

  Age: string = '';
  EmployeeCode = '';

  lookups: { [key: string]: lookupDto[] };

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
    this.loadLookups();
    this.subscribe();
    this.onBirthDateChange();
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      //LookupEnum.Country,
      LookupEnum.Gender,
      LookupEnum.MaritalStatus,
      LookupEnum.Religion,
      LookupEnum.MilitaryStatus,
      LookupEnum.BloodType,
    ]);
  }
  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  onBirthDateChange() {
    const birthDateControl = this.editEmployeeForm.get('birthDate');
    birthDateControl?.valueChanges.subscribe((birthDate) => {
      this.Age = '';
      if (birthDateControl.valid) 
        this.Age = this.ageService.calculateAge(birthDate);
    });
  }

  private initializeForm() {
    this.editEmployeeForm = this.formBuilder.group({
      attendanceCode: new FormControl('', [customValidators.required]),
      employeeName: new FormControl('', [
        customValidators.required,
        customValidators.onlyLetter,
        customValidators.length(1, 75),
      ]),
      employeePhoto: new FormControl(null),
      birthDate: new FormControl(null, [
        customValidators.required,
        customValidators.invalidBirthDate,
        customValidators.notUnderAge(18),
      ]),
      countryOfBirth: new FormControl('', [customValidators.required]),
      birthCity: new FormControl('', [customValidators.required]),
      nationality: new FormControl('', [customValidators.required]),
      gender: new FormControl('', [customValidators.required]),
      maritalStatus: new FormControl('', [customValidators.required]),
      religion: new FormControl('', [customValidators.required]),
      militaryStatus: new FormControl('', [customValidators.required]),
      militaryNumber: new FormControl(null, customValidators.length(0, 25)),
      bloodType: new FormControl(null),
      withSpecialNeeds: new FormControl(false),
    });
  }
  initializeFormData() {
    this.employeeService.getEmployeeById(this.routerService.currentId).subscribe((res) => {
      this.editEmployeeForm.patchValue({
        ...res,
        birthDate: res.birthDate.substring(0, 10),
      });
    });
  }
  onSubmit() {
    if (!this.formsService.validForm(this.editEmployeeForm, true)) return;
    const request: EditEmployeePersonal = this.editEmployeeForm.value;
    request.id = this.routerService.currentId;
    request.employeePhoto = 'sfdsdf';
    this.employeeService.editEmployee(request);
  }

  onDiscard() {
   this.editEmployeeForm.reset();
  }

  constructor(
    public lookupsService: LookupsService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private employeeService: EmployeeService,
    private routerService: RouterService,
    public sharedLibEnums: SharedLibraryEnums,
    private ageService: AgeService
  ) {}
}
