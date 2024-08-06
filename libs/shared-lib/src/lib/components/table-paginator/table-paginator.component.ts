import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { PageInfo } from '../../models';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'lib-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css'],
})
export class TablePaginatorComponent implements OnInit {
  @Input() paginationInfo : any = 0
  @Input() totalRecords: number;
  first : Subject<any> = new Subject()
  @Input() rows: number;

  @Output() pageChange = new EventEmitter<PageInfo>();

  ngOnInit() {
    this.first.subscribe(res=>{
     // console.log(res)
    })
  }

  onPageChange(e: any) {
    //console.log(e)
    

    let pageInfo = new PageInfo(e.page + 1, e.rows , e.first);
    this.paginationInfo = pageInfo
   // console.log(this.paginationInfo)
    this.pageChange.emit(pageInfo);

    this.first.next(e['first']) 
    // this.cdr.detectChanges();

  }

  constructor(private cdr: ChangeDetectorRef) {}
}
