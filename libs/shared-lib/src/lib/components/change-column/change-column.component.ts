import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-change-column',
  templateUrl: './change-column.component.html',
  styleUrl: './change-column.component.css'
})
export class ChangeColumnComponent {
@Input() columnsList : any = []
}
