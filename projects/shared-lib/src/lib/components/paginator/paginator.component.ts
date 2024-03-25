import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() first: number;
  @Input() rows: number;
  @Input() totalRecords: number;
  @Output() valueChanged = new EventEmitter<any>();
  onPageChange(event:any){

    this.valueChanged.emit(event);
  }
}
