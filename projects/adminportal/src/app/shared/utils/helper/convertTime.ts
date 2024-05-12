import { DatePipe } from "@angular/common";

export function convertTime(value : any) {
  console.log(value)
  if(value) {
    const date = new Date(value);
    const datePipe = new DatePipe('en-US');
    let formattedTime = datePipe.transform(date, 'HH:mm:ss.SSSSSSS');
    return formattedTime

  }else {
    value = null
    return null
  }
}
