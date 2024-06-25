import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-calendar',

  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
@Input() placeholder : string
@Input() dateFormat : string = 'dd/mm/yy'
@Input() minDate : Date
@Input() maxDate : Date
}
