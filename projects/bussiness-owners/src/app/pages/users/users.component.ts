 import { Component, OnInit } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { LogService, ToasterService } from 'shared-lib';
import { UserService } from '../../services/users.httpsservice';
import { LanguageService ,RouterService } from 'shared-lib';
import { MatDialog } from '@angular/material/dialog';
import { UserInviteFormComponent } from '../../components/userscomps/invite-form/user-invite-form/user-invite-form.component';
import { bouserdetails } from '../../components/userscomps/bouserdetails/bouserdetails.component';
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
    private userService: UserService,
    private dialog: MatDialog,
    private router: RouterService,
    private logService: LogService
  ) {}
  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.userData = res.response;
      },
    });
  }
  toggle(id: string, isActive: boolean) {
    if (!isActive) this.activate(id);
    else this.deactivate(id);
  }

  openInviteModal() {
    const dialogRef = this.dialog.open(UserInviteFormComponent, {
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe((result: UserListResponse) => {
      if (result as UserListResponse) this.userData.push(result);
    });
  }

  async activate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      this.userService.activateUser(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.UserActivatedSuccessfully')
          );

          let indexToChange = this.userData.find((item) => item.id === id);
          indexToChange!.isActive = true;
        },
      });
    }
  }
  async deactivate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      this.userService.deactivateUser(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.UserDeactivatedSuccessfully')
          );
          let indexToChange = this.userData.find((item) => item.id === id);
          indexToChange!.isActive = false;
        },
      });
    }
  }
  async editUser(Id: string) {
    const dialogRef = this.dialog.open(bouserdetails, {
      width: '800px',
      height: '700px',
      data: { Id: Id }
    });
    dialogRef.
    dialogRef.afterClosed().subscribe((result: UserListResponse) => {
      if (result as UserListResponse) this.userData.push(result);
    });
  //  this.logService.log('users/bouserdetails/' + Id);
   // this.router.navigateTo('users/bouserdetails/' + Id);
  }
}
