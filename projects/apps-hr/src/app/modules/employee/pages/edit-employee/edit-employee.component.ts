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
import {
  CityDto,
  CountryDto,
  EditEmployeePersonal,
  Gender,
  SharedEmployeeEnums,
} from '../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  providers: [RouterService],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: FormGroup;
  LookupEnum = LookupEnum;
  countries: CountryDto[] = [];
  cities: CityDto[];
  age: string = '';
  employeeCode = '';
  employeePhoto: string = '';
  selectedCountryOfBirth: string;
  selectedBirthCity: number;
  selectedNationality: string;
  selectedGender: string;
  selectedMaritalStatus: string;
  selectedReligion: string;
  selectedMilitaryStatus: string;
  selectedBloodType?: string;

  lookups: { [key: string]: lookupDto[] };

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
    this.loadCountries();
    this.loadLookups();
    this.subscribe();
    this.onBirthDateChange();
    this.titleService.setTitle('Edit Employee');

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
    const birthDateControl = this.editEmployeeForm.get('birthDate');
    birthDateControl?.valueChanges.subscribe((birthDate) => {
      this.age = '';
      if (birthDateControl.valid) this.age = this.ageService.calculateAge(birthDate);
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
        gender: res.gender,
      });
      this.employeePhoto = res.employeePhoto;
      this.employeeCode = res.employeeCode;
      this.selectedCountryOfBirth = res.countryOfBirth;
      this.selectedNationality = res.nationality;
      this.selectedBirthCity = res.birthCity;
      this.selectedGender = this.enums.Gender[res.gender].toString();
      this.selectedMaritalStatus = this.enums.MaritalStatus[res.maritalStatus].toString();
      this.selectedReligion = this.enums.Religion[res.religion].toString();
      this.selectedMilitaryStatus = this.enums.MilitaryStatus[res.militaryStatus].toString();

      if (res.bloodType) this.selectedBloodType = this.enums.BloodType[res.bloodType].toString();

      this.employeeService.loadCities(this.selectedCountryOfBirth);
      this.employeeService.cities.subscribe((cities) => {
        this.cities = cities;
        this.selectedBirthCity = res.birthCity;

        this.editEmployeeForm.patchValue({ birthCity: this.selectedBirthCity });
      });
    });
  }
  onSubmit() {
    if (!this.formsService.validForm(this.editEmployeeForm, true)) return;

    const request: EditEmployeePersonal = this.editEmployeeForm.value;

    request.id = this.routerService.currentId;

    this.employeeService.editEmployee(request);

    this.employeeService.editEmployeeStatus.subscribe({
      next: (success) => {
        if (success) {
          this.routerService.navigateTo(`/masterdata/employee`);
        }
      },
    });
  }

  onDiscard() {
    //this.editEmployeeForm.reset();
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
    private routerService: RouterService,
    private enums: SharedEmployeeEnums,
    public sharedLibEnums: SharedLibraryEnums,
    private ageService: AgeService,
    private titleService: Title

  ) {}
}
