import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GeneralSettingService } from '../../general-setting.service';
import { FormsService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-create-financial-calendar',
  templateUrl: './create-financial-calendar.component.html',
  styleUrl: './create-financial-calendar.component.scss'
})
export class CreateFinancialCalendarComponent implements OnInit {
  constructor(private fb :FormBuilder , private generalSettingService: GeneralSettingService, private formsService: FormsService){
    this.generateYearsList()
  }
  statusFlag : boolean = true
  minDatefrom : Date | null
  maxDatefrom : Date | null
  minDateTo : Date | null
  maxDateTo : Date | null
  formGroup  :FormGroup
  yearsList : any = []
  showOpenBtn : boolean = false
  disablrFromDateFlag : boolean = false
  tableData : any = [];
  tableList : any = []
  ngOnInit(): void {
  this.formGroup = this.fb.group({
    name: new FormControl('',  customValidators.required),
    year : 0,
    code : '',
    fromDate : new FormControl('',  customValidators.required),
    toDate : new FormControl('',  customValidators.required),
    noOfExtraPeriods : 0
  })

  this.formGroup.get('year')?.valueChanges.subscribe(res=>{
    this.formGroup.get('code')?.setValue(res)
  })
  this.formGroup.valueChanges.subscribe(res=>{
    if(res.toDate) {
      this.maxDatefrom = new Date(res.toDate)
    }else if(res.fromDate) {
      this.minDateTo =  new Date(res.fromDate)
    }
    // this.maxDatefrom = new Date(res.toDate)
    //   this.minDateTo = res.fromDate ? new Date(res.fromDate) : null
    if(res.fromDate && res.toDate) {
      
  this.tableList =  this.generateDateArray(res.fromDate , res.toDate);

    }
  })
  this.generalSettingService.GetFinancialPeriodLastYearDate()
  this.generalSettingService.FinancialPeriodLastYearDateObservable.subscribe(res=>{
    console.log(res)
    if(res) {
      this.formGroup.get('fromDate')?.patchValue(new Date(res));
      this.disablrFromDateFlag = true
    } 
  })
  }

  generateYearsList(): void {
    const currentYear = new Date().getFullYear();
    for (let i = -25; i <= 25; i++) {
      this.yearsList.push({ name: (currentYear + i).toString() });
    }
  }

  generateDateArray(fromDate : Date, toDate : Date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let result = [];
    let currentDate = new Date(fromDate);
    let code = 0;
  
    while (currentDate <= toDate) {
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth();
      let monthName = months[month];
  
      let periodStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      let periodEnd;
  
      if (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0) > toDate) {
        periodEnd = new Date(toDate);
      } else {
        periodEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      }
      
      result.push({
        month: monthName,
        year: year,
        periodStart:  periodStart,
        periodEnd:  periodEnd
      });
  
      // Move to the next month
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      code++;
    }
  
    return result;
  }

  onGenerate() {
    this.tableData = this.tableList 
  }
  onOpenPeriod() {
    this.statusFlag = false
    this.tableData = this.tableData.map((elem : any)=>{
      elem.status = true;
      return elem
    })
  }

  
  onSave() {

    if (!this.formsService.validForm(this.formGroup, false)) return;

    let formValues = {...this.formGroup.getRawValue()}
   
    let savedData = this.tableData.map((elem:any)=> {
      return {
        periodStart : elem.periodStart,
        periodEnd : elem.periodEnd
      }
    })
    delete formValues.code
     formValues.fromDate = formValues.fromDate
     formValues.toDate = formValues.toDate

    formValues.financialYearPeriods = savedData;

    console.log(formValues)

    this.generalSettingService.addFinancialCalendar(formValues)
    this.generalSettingService.addFinancialCalendarResObservable.subscribe(res=>{
      console.log(res)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      if(res) {
        this.showOpenBtn = true
        
        this.tableData = res.periods
        this.tableData = this.tableData.map((elem : any)=>{
          elem.month = months[elem.month - 1]
          return elem
        })
      
        
      }
    })
  }

  onOpen() {
    
    let periodIDS = this.tableData.filter((elem:any)=>elem.status)
    console.log(periodIDS)
    periodIDS =  periodIDS.map((elem : any)=>elem.id)
    this.generalSettingService.OpenFinancialCalendar({periods : periodIDS})
    this.generalSettingService.openFinancialCalendarResObservable.subscribe(res=>{
      console.log(res)
      if(res) {
        
        
      }
    })
  }
  
}