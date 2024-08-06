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
  styleUrls: ['./table-paginator.component.css'],
})
export class TablePaginatorComponent implements OnInit {
  @Input() paginationInfo : any = 0
  @Input() totalRecords: number;
  first : Subject<any> = new Subject()
  test : any = {}
  @Input() rows: number;

  @Output() pageChange = new EventEmitter<PageInfo>();

  ngOnInit() {
    this.first.subscribe(res=>{
      console.log(res)
    })
    this.generalService.sendPageChangesObs.subscribe(res=>{
      if(res) {
        console.log(res)
        this.test = res
        this.onPageChange(res)

      }
    })
  }

  onPageChange(e: any) {
    

    let pageInfo = new PageInfo(e.page + 1, e.rows , e.first);
    this.paginationInfo = pageInfo
    this.pageChange.emit(pageInfo);

    this.first.next(e['first']) 
    console.log("sdfsd")
    // this.cdr.detectChanges();

  }

  constructor(private cdr: ChangeDetectorRef , private generalService : GeneralService) {}
}
