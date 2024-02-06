import { Component, OnInit } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { RouterService, ToasterService } from 'shared-lib';
import { UserService } from '../../services/users.httpsservice';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userData: UserListResponse[];
  status: string;

  constructor(
    private toasterService: ToasterService,
    private routerService: RouterService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.userData = res;
      },
    });
  }
  async ActivateAndDeactivate(id : number){
    const confirmed = await this.toasterService.showConfirm();
    if (confirmed) 
    {
      this.userService.ActivateAndDeactivate(id).subscribe({
        next: (res) => {
          if(res)this.status='user activaed'
          else this.status='user deactivaed'
          this.toasterService.showSuccess('Success',this.status+ ' Succefully');
        }
      })
    }
  }
}
