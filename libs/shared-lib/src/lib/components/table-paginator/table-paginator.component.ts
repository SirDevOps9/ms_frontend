import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { PageInfo } from '../../models';

@Component({
  selector: 'lib-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css'],
})
export class TablePaginatorComponent implements OnInit {

  @Input() totalRecords: number;

  @Input() rows: number;

  @Output() pageChange = new EventEmitter<PageInfo>();

  ngOnInit() {}

  onPageChange(e: any) {
    
    let pageInfo = new PageInfo(e.page + 1, e.rows);
    
    this.pageChange.emit(pageInfo);
  }

  constructor() {}
}
