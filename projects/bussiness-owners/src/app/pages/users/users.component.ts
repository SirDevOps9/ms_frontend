import { Component, OnInit ,PipeTransform} from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { RouterService, ToasterService } from 'shared-lib';
import { UserService } from '../../services/users.httpsservice';
import { LanguageService } from 'dist/shared-lib';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userData: UserListResponse[];
  

  constructor(
    public languageService: LanguageService,
    private toasterService: ToasterService,
    private routerService: RouterService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getAll().subscribe({
      next: (res) => {
        this.userData = res;
      },
    });
  }
  async ActivateAndDeactivate(id : number ){
    const confirmed = await this.toasterService.showConfirm();
    let status ;
    if (confirmed) 
    {
      this.userService.ActivateAndDeactivate(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess('Success', res.response);
          this.getAllUsers();
            },
            error: (err) => {
              this.toasterService.showError('Error',err)
            }
      })
    }
  }
}
