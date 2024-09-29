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
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'lib-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss'],
})
export class TablePaginatorComponent implements OnInit {
  @Input() paginationInfo: any = 0;
  @Input() totalRecords: number;
  first: Subject<any> = new Subject();
  test: any = {};
  @Input() rows: number;
  currentPage: number = 1;
  @Output() pageChange = new EventEmitter<PageInfo>();

  get lastPage(): number {
    return Math.ceil(this.totalRecords / this.rows);
  }

  ngOnInit() {
    this.first.subscribe((res) => {
      // console.log(res)
    });
    this.generalService.sendPageChangesObs.subscribe((res) => {
      if (res) {
        console.log(res);
        this.test = res;
        this.onPageChange(res);
      }
    });
    this.generalService.sendPageChangesObs.subscribe((res) => {
      if (res) {
        console.log(res);
        this.test = res;
        this.onPageChange(res);
      }
    });
  }

  onPageChange(e: any) {
    //console.log(e)

    let pageInfo = new PageInfo(e.page + 1, e.rows, e.first);
    this.currentPage = e.page + 1;
    this.paginationInfo = pageInfo;
    this.pageChange.emit(pageInfo);
    this.first.next(e['first']);
    // this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef, private generalService: GeneralService) {}
}
