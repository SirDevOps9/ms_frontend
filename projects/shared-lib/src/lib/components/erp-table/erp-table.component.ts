import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { PageInfo, ResponseItems } from '../../models/index';

@Component({
  selector: 'app-erp-table',
  templateUrl: './erp-table.component.html',
  styleUrl: './erp-table.component.css',
})
export class ErpTableComponent {
  @Input() headers: string[] = [];
  @Input() tableData: any;
  @Input() headerTranslations: string[] = [];
  @Input() editPath: string = '';
  @Input() tableId: string = 'id';
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() paginateEvent = new EventEmitter<PageInfo>();
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private routerService: RouterService) {}
  editItem(itemId: string): void {
    this.routerService.navigateTo(this.editPath + itemId);
  }
  onDelete(index: any) {
    this.deleteEvent.emit(index);
  }

  // onPageChange(event: any): void {
  //   if (this.tableData.pageInfo) {
  //     let pageInfo: PageInfo = {
  //       pageNo: event.pageIndex + 1,
  //       resultsPerPage: event.pageSize,
  //     };
  //     console.log(pageInfo);

  //     this.paginateEvent.emit(pageInfo);
  //   } 
    
  //   // else { // reserved for client side 
  //   //   const startIndex = event.pageIndex * event.pageSize;
  //   //   const endIndex = startIndex + event.pageSize;

  //   //   this.tableData.items = this.tableData.items.slice(startIndex, endIndex);
  //   // }
  // }
}
