import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterBase } from '../../models';

@Component({
  selector: 'lib-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css'],
})
export class TablePaginatorComponent implements OnInit {
  
  @Output() pageChange = new EventEmitter<FilterBase>();

  ngOnInit() {}

  onPageChange(e: any) {
    let pageInfo: FilterBase = {
      offset: e.page + 1,
      pageSize: 10,
    };

    this.pageChange.emit(pageInfo);
  }

  constructor() {}
}
