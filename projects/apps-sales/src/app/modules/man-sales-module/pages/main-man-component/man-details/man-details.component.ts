import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from 'projects/apps-hr/src/app/modules/employee/employee.service';
import { NationalityDto, AddEmployeePersonal } from 'projects/apps-hr/src/app/modules/employee/models';
import { LookupEnum, lookupDto, customValidators, LookupsService, FormsService, SharedLibraryEnums, AgeService, RouterService } from 'shared-lib';
import { CountryDto, CityDto } from '../../../../sales/models';

@Component({
  selector: 'app-man-details',
  templateUrl: './man-details.component.html',
  styleUrl: './man-details.component.scss'
})
export class ManDetailsComponent implements OnInit {
  addEmployeeForm: FormGroup;
  LookupEnum = LookupEnum;

  Age: string = '';
  EmployeeCode = '';
  countries: CountryDto[] = [];
  nationalities: NationalityDto[] = [];

  cities: CityDto[];
  lookups: { [key: string]: lookupDto[] };
  selectedNationality: string;

  ngOnInit() {
    this.initializeForm();
    this.loadCountries();
    this.loadNationalities();
    this.loadLookups();
    this.subscribe();
    this.onBirthDateChange();
    this.onCountryOfBirthChange();
    this.titleService.setTitle('Add Employee');

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
  
  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  onBirthDateChange() {
    const birthDateControl = this.addEmployeeForm.get('birthDate');
    birthDateControl?.valueChanges.subscribe((birthDate) => {
      this.Age = '';
      if (birthDateControl.valid) this.Age = this.ageService.calculateAge(birthDate);
    });
  }

  onCountryOfBirthChange() {
    const countryOfBirthControl = this.addEmployeeForm.get('countryOfBirth');
    countryOfBirthControl?.valueChanges.subscribe((countryId) => {
      if (countryId) {
        this.addEmployeeForm.get('nationality')?.setValue(countryId);
        this.selectedNationality = countryId;
      }
    });
  }
  private initializeForm() {
    this.addEmployeeForm = this.formBuilder.group({
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

  onSubmit() {
    if (!this.formsService.validForm(this.addEmployeeForm, true)) return;
    const request: AddEmployeePersonal = this.addEmployeeForm.value;
    this.employeeService.addEmployee(request);

    this.employeeService.addEmployeeStatus.subscribe({
      next: (success) => {
        if (success) {
          this.routerService.navigateTo(`/masterdata/employee`);
        }
      },
    });
    //this.employeeService.addEmployeeStatus.next(false);
  }

  onDiscard() {
   this.addEmployeeForm.reset();
    this.routerService.navigateTo(`/masterdata/employee`);

  }

  loadCountries() {
    this.employeeService.loadCountries();
    this.employeeService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }
  loadNationalities() {
    this.employeeService.loadNationalities();
    this.employeeService.nationalities.subscribe({
      next: (res) => {
        this.nationalities = res;
      },
    });
  }
  onCountryChange(event: any) {
    const countryId = event;
    if (!countryId) return;
    this.employeeService.loadCities(countryId);
    this.employeeService.cities.subscribe((res) => {
      this.cities = res;
    });
  }

  constructor(
    public lookupsService: LookupsService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private employeeService: EmployeeService,
    public sharedLibEnums: SharedLibraryEnums,
    private ageService: AgeService,
    private routerService: RouterService,
    private titleService: Title

  ) {}
}
