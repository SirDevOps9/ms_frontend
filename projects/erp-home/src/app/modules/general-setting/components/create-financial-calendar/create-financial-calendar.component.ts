import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GeneralSettingService } from '../../general-setting.service';
import { FormsService, LanguageService, RouterService, customValidators } from 'shared-lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-financial-calendar',
  templateUrl: './create-financial-calendar.component.html',
  styleUrl: './create-financial-calendar.component.scss',
})
export class CreateFinancialCalendarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private generalSettingService: GeneralSettingService,
    private formsService: FormsService,
    private titleService: Title,
    private languageService: LanguageService,
    private router: RouterService
  ) {
    this.generateYearsList();
  }
  statusFlag: boolean = true;
  minDatefrom: Date | null;
  maxDatefrom: Date | null;
  minDateTo: Date | null;
  maxDateTo: Date | null;
  defaultDateTo: Date | null;
  formGroup: FormGroup;
  yearsList: any = [];
  periodIDS: any = [];
  showOpenBtn: boolean = false;
  opened: boolean = false;
  disablrFromDateFlag: boolean = false;
  tableData: any = [];
  tableList: any = [];
  ngOnInit(): void {
    this.titleService.setTitle(
      this.languageService.transalte('financialCalendar.addfinancialCalendar')
    );
    this.formGroup = this.fb.group({
      name: new FormControl('', customValidators.required),
      year: 0,
      code: '',
      fromDate: new FormControl('', customValidators.required),
      toDate: new FormControl('', customValidators.required),
      noOfExtraPeriods: 0,
    });

    this.formGroup.get('year')?.valueChanges.subscribe((res) => {
      this.formGroup.get('code')?.setValue(res);
    });

    this.formGroup.get('fromDate')?.valueChanges.subscribe((res) => {
      this.tableData = [];
    });
    this.formGroup.get('toDate')?.valueChanges.subscribe((res) => {
      this.tableData = [];
    });

    this.formGroup.valueChanges.subscribe((res) => {
      if (res.toDate) {
        this.maxDatefrom = new Date(res.toDate);
      } else if (res.fromDate) {
        this.minDateTo = new Date(res.fromDate);
        this.defaultDateTo = new Date(res.fromDate.getFullYear(), 11, 31);
        this.formGroup.get('toDate')?.patchValue(this.defaultDateTo);
      }
    });

    this.generalSettingService.FinancialPeriodLastYearDateObservable.subscribe((res) => {
      if (res) {
        let year = res.year;
        this.formGroup.get('fromDate')?.patchValue(new Date(res.fromDate));
        this.disablrFromDateFlag = true;
        this.yearsList = this.yearsList.filter((elem: any) => elem.name > year);
      }
    });

    this.generalSettingService.GetFinancialPeriodLastYearDate();
  }

  generateYearsList(): void {
    const currentYear = new Date().getFullYear();
    for (let i = -25; i <= 25; i++) {
      this.yearsList.push({ name: (currentYear + i).toString() });
    }
  }

  generateDateArray(fromDate: Date, toDate: Date) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let result = [];
    let currentDate = fromDate;
    let code = 0;

    while (currentDate <= toDate) {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth();
      let monthName = months[month];

      let periodStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      let periodEnd;

      if (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0) > toDate) {
        periodEnd = new Date(toDate);
      } else {
        periodEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }

      result.push({
        month: monthName,
        year: year,
        periodStart: this.convertDateFormat(periodStart),
        periodEnd: this.convertDateFormat(periodEnd),
      });

      // Move to the next month
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      code++;
    }

    return result;
  }

  onGenerate() {
    let formValue = this.formGroup.value;
    if (formValue.fromDate && formValue.toDate) {
      this.tableList = this.generateDateArray(formValue.fromDate, formValue.toDate);
      this.tableData = this.tableList;
    }
  }
  onOpenPeriod() {
    this.statusFlag = false;
    this.tableData = this.tableData.map((elem: any) => {
      elem.status = true;
      return elem;
    });
    let periodIDS = this.tableData.filter((elem: any) => elem.status);
    this.periodIDS = periodIDS.map((elem: any) => elem.id);
  }
  convertDateFormat(data: Date) {
    const date = new Date(data);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date into YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  onSave() {
    if (!this.formsService.validForm(this.formGroup, false)) return;

    let formValues = { ...this.formGroup.getRawValue() };

    let savedData = this.tableData.map((elem: any) => {
      return {
        periodStart: elem.periodStart,
        periodEnd: elem.periodEnd,
      };
    });
    delete formValues.code;
    formValues.fromDate = this.convertDateFormat(formValues.fromDate);
    formValues.toDate = this.convertDateFormat(formValues.toDate);

    formValues.financialYearPeriods = savedData;

    this.generalSettingService.addFinancialCalendar(formValues);
    this.generalSettingService.addFinancialCalendarResObservable.subscribe((res) => {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      if (res) {
        this.showOpenBtn = true;

        this.tableData = res.periods;
        this.tableData = this.tableData.map((elem: any) => {
          elem.month = months[elem.month - 1];
          return elem;
        });
      }
    });
  }

  onOpen() {
    this.statusFlag = false;
    this.tableData = this.tableData.map((elem: any) => {
      elem.status = true;
      return elem;
    });

    let periodIDS = this.tableData.map((elem: any) => elem.id);
    this.generalSettingService.OpenFinancialCalendar({ periods: periodIDS });
    this.generalSettingService.openFinancialCalendarResObservable.subscribe((res) => {
      if (res) {
        this.opened = true;
      }
    });
  }
  routeToList() {
    this.router.navigateTo('/masterdata/financial-calendar');
  }
}
