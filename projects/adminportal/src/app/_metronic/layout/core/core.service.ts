import { Injectable } from '@angular/core';
import { ValidationConfig } from 'src/app/validations/validation';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
 // List Of Multiple validations With Custom Message
 ListOfValidations = [
  {name : ValidationConfig.noNumber , message : "Field Doesn't Accept Numbers"},
  {name : ValidationConfig.ARValidate , message : 'Field Should Contain Only Arabic Characters'},
  {name : ValidationConfig.enValidate , message : 'Field Should Contain Only English Characters'},
]
constructor() { }

// Draw Queries For Page Size and Number Of Page
filterFunc( query : any , obj : any  , filters?:any) {
 Object.keys(obj).forEach((a , index)=>{
   if(obj[a]) query += index == Object.keys(obj).length -1 ? `${a}=${obj[a]}` : `${a}=${obj[a]}&`;
 })
  if(filters)  return query + filters
  else return query
 }

// multiple pattern for nameAr every multiple Patter will work Like That
 mutiplePatterns(form:any , key , validation , fields ) {
   form?.form?.valueChanges?.subscribe(res=>{
    let val;
    validation.forEach((elem : any)=>{
     val = this.ListOfValidations.find(item=>item.name == elem);
     if(form?.form?.controls[key]?.errors?.pattern?.requiredPattern.includes(val.name)) {
      let index = fields.findIndex((elem) => elem.key == key);
      fields[index].validators.PatternMessage = val.message
    }
    });
  })
 }

// Change Field To En Or Ar Depends On Input Value
 filterEnglishAndArabic(filterForm , filterConfig , clonedfilter , key , enKey , arKey , placeHolder) {
  filterForm.form.valueChanges.subscribe((res) => {
    let englishCheck: any;
    for (let i in res) {
      if (i.includes(key)) {
        englishCheck = /^[\w\u0590-\u05FF0-9 ]+$/.test(res[i]);
      }
    }
    let index = filterConfig.filterData.findIndex(
      (elem) => elem.placeHolder ==  placeHolder
    );
    if (englishCheck) {
      clonedfilter = Object.assign({} , filterConfig)
      console.log(filterConfig.filterData)
      console.log(index)
      filterConfig.filterData[index].name = enKey;
      filterConfig = {}
      filterConfig = clonedfilter
      filterForm.form.value.nameEn = res.nameAr
      delete filterForm.form.value.nameAr
    } else {
    if(filterConfig.filterData[index]?.name)  filterConfig.filterData[index].name = arKey;
      clonedfilter = Object.assign({} , filterConfig);
      filterConfig = {}
      filterConfig = clonedfilter

    }

  });
 }

//  disable Date To Depends on Date From
 disableDate(filterForm ,filterConfig , start , end) {
  let dateFromIndex = filterConfig.filterData.findIndex(elem=>elem?.name == start);
  let dateToIndex = filterConfig.filterData.findIndex(elem=>elem?.name == end);
  filterForm.form.valueChanges.subscribe(res=>{
    if(res ) {
      if(res[end]) {
        filterConfig.filterData[dateFromIndex].dateOptions.maxDate = new Date(res[end])
      }
      if(!res[end]) {
        filterConfig.filterData[dateFromIndex].dateOptions.maxDate =''

      }
      if(res[start]) {
        filterConfig.filterData[dateToIndex].dateOptions.minDate = new Date(res[start])

      }
      if(!res[start]) {
        filterConfig.filterData[dateToIndex].dateOptions.minDate = ''

      }

    }

  })
 }


}
