import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GeneralSettingService } from '../../general-setting.service';
import { ActivatedRoute } from '@angular/router';
import { editFinancialCalndar } from '../../models';
import { FormsService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-edit-financial-calendar',
  templateUrl: './edit-financial-calendar.component.html',
  styleUrl: './edit-financial-calendar.component.scss',
})
export class EditFinancialCalendarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private generalSettingService: GeneralSettingService,
    private route: ActivatedRoute,
    private formsService: FormsService
  ) {
    this.generateYearsList();
  }
  statusFlag: boolean = true;
  minDatefrom: Date | null;
  maxDatefrom: Date | null;
  minDateTo: Date | null;
  maxDateTo: Date | null;
  formGroup: FormGroup;
  yearsList: any = [];
  showOpenBtn: boolean = false;
  disablrFromDateFlag: boolean = false;
  tableData: any = [];
  tableList: any = [];
  FinancialPeriodData: editFinancialCalndar;
  id: number = this.route.snapshot.params['id'];
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl('', customValidators.required),
      year: 0,
      code: '',
      fromDate: '',
      toDate: '',
      noOfExtraPeriods: 0,
    });

    this.formGroup.get('year')?.valueChanges.subscribe((res) => {
      this.formGroup.get('code')?.setValue(res);
    });
    this.formGroup.valueChanges.subscribe((res) => {
      if (res.fromDate) {
        this.minDateTo = new Date(res.fromDate);
      }
      // this.maxDatefrom = new Date(res.toDate)
      //   this.minDateTo = res.fromDate ? new Date(res.fromDate) : null
      if (res.fromDate && res.toDate) {
        this.tableList = this.generateDateArray(res.fromDate, res.toDate);
      }
    });
    this.generalSettingService.GetFinancialPeriodLastYearDate();
    this.generalSettingService.FinancialPeriodLastYearDateObservable.subscribe((res) => {
      console.log(res);
      if (res) {
        this.formGroup.get('fromDate')?.patchValue(new Date(res));
        this.disablrFromDateFlag = true;
      }
    });

    this.generalSettingService.GetFinancialPeriodByID(this.id);
    this.generalSettingService.FinancialPeriodDataByIDObservable.subscribe(
      (res: editFinancialCalndar) => {
        console.log('Edit', res);
        if (res) {
          this.FinancialPeriodData = res;
          this.formGroup.patchValue({
            name: res.name,
            year: res.year,
            code: res.code,
            fromDate: res.fromDate ? new Date(res.fromDate) : null,
            toDate: res.toDate ? new Date(res.toDate) : null,
          });
          this.tableData = res.periods;
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

          this.tableData = this.tableData?.map((elem: any) => {
            elem.month = months[elem.month - 1];
            return elem;
          });
        }
      }
    );
  }

  generateYearsList(): void {
    const currentYear = new Date().getFullYear();
    for (let i = -25; i <= 25; i++) {
      this.yearsList.push({ name: currentYear + i });
    }
    console.log(this.yearsList);
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
    let currentDate = new Date(fromDate);
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
    this.tableData = this.tableList;
  }
  onOpenPeriod() {
    this.statusFlag = false;
    this.tableData = this.tableData.map((elem: any) => {
      elem.status = true;
      return elem;
    });
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

  onEdit() {
    if (!this.formsService.validForm(this.formGroup, false)) return;

    this.generalSettingService.editFinancialPeriod({
      id: this.id,
      name: this.formGroup.get('name')?.value,
    });
    this.generalSettingService.EditFinancialPeriodDataObservable.subscribe((res) => {
      if (res) {
      }
    });
  }
}
