import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { RouterService } from 'shared-lib';
import { SubscriptionService } from '../../../../subscription.service';

@Component({
  selector: 'app-manage-status',
  templateUrl: './manage-status.component.html',
  styleUrl: './manage-status.component.scss',
})
export class ManageStatusComponent implements OnInit {
  id: any;
  statusList: { id: number; name: string }[];
  _subscriptionService = inject(SubscriptionService);
  constructor(private _router: RouterService, private route: ActivatedRoute) {
    // this.id = this.route.snapshot.paramMap.get('id')

    this.route.params
      .pipe(
        map((params) => {
          this.id = Number(params['id']);
        })
      )
      .subscribe();

    console.log(this.id);
  }
  ngOnInit(): void {
    this.getStatusLokup(this.id);
  }

  getStatus(event: {id:number , name:string}) {
    console.log(event);
    
  }
  getStatusLokup(id: number) {
    this._subscriptionService.statusDropDown(id);
    this._subscriptionService.statusDropDownList$.subscribe({
      next: (res: { id: number; name: string }[]) => {
        this.statusList = res;
        console.log(res);
      },
    });
  }
}
