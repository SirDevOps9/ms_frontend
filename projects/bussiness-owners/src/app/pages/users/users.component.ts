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
  async ActivateAndDeactivate(id : number , currentstatus :Boolean){
    const confirmed = await this.toasterService.showConfirm("ConfirmButtonTexttochangstatus");
    let status ;
    if (confirmed) 
    {
      this.userService.ActivateAndDeactivate(id).subscribe({
        next: (res) => {
          if(currentstatus)this.toasterService.showSuccess('Success', this.languageService.transalte('User.userDeactivatedSuccessfully'));
          else
          this.toasterService.showSuccess('Success', this.languageService.transalte('User.userActivatedSuccessfully'));

          let indexToChange = this.userData.findIndex(item => item.id === id);
          this.userData[indexToChange].isActive = !currentstatus;
            },
            error: (err) => {
              this.toasterService.showError('Error',err)
            }
      })
    }
  }
}
