import { Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { RouterService } from 'shared-lib';
import { SubscriptionService } from '../../../../subscription.service';
import { AddStatusComponent } from '../../../../components/workflow-comp/add-status/add-status.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EditStatusComponent } from '../../../../components/workflow-comp/edit-status/edit-status.component';

@Component({
  selector: 'app-manage-status',
  templateUrl: './manage-status.component.html',
  styleUrl: './manage-status.component.scss',
})
export class ManageStatusComponent implements OnInit {
  id: number;
  statusList: { id: number; name: string }[];
  selectedStatusId: number 
  _subscriptionService = inject(SubscriptionService);
  _router = inject(RouterService);
  route = inject(ActivatedRoute);
  dialog = inject(DialogService);
  // boolean
  showAdd: boolean = false
  showEdit: boolean = false
  showList: boolean = true

  ngOnInit(): void {
    debugger;
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    console.log(this.id);
    this.getId();
    this.getStatusLokup(this.id);
  }
  getId() {
    this.route.params
      .pipe(
        map((params) => {
          this.id = Number(params['id']);
        })
      )
      .subscribe();
  }

  getStatus(event: { id: number; name: string }) {
    this.selectedStatusId = event.id;

    this.showAdd = false
    this.showEdit = false
    this.showList = true
    console.log(event);
  }

  stopCall: boolean = true;
  onEdit( item: { id: number; name: string }) {
    // this.stopCall = val;
    const dialogRef = this.dialog.open(EditStatusComponent, {
      width: '400px',
      height: '300px',
      data: item,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.getStatusLokup(this.id);
      } else {
        return;
      }
    });
  }

  onDelete(id:number){
this._subscriptionService.deleteState(id)    
  }
  getStatusLokup(id: number) {
    this._subscriptionService.statusListViews(id);
    this._subscriptionService.statusListView$.subscribe({
      next: (res: { id: number; name: string }[]) => {
        this.statusList = res;
        console.log(res);
      },
    });
  }
  addStatus() {
    const dialogRef = this.dialog.open(AddStatusComponent, {
      width: '400px',
      height: '300px',
      data: { id: this.id },
    });

    dialogRef.onClose.subscribe(() => {
      this.getStatusLokup(this.id);
    });
  }

  showAddComponent(event: boolean){
    this.showAdd = event
    this.showEdit = !event
    this.showList = !event
    console.log(event);
    
  }
  finishAdd(event : boolean){
    this.showAdd = !event
    this.showEdit = !event
    this.showList = event
  }

  finishEdit(event : boolean){
    this.showAdd = !event
    this.showEdit = event
    this.showList = !event
  }
  rowObjectToUpdate : any
  loadObjToUpdate(obj : any){
    this.showAdd = false
    this.showEdit = true
    this.showList = false
    this.rowObjectToUpdate = obj
  }
}
