import { Component, OnInit, PipeTransform } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { ToasterService } from 'shared-lib';
import { UserService } from '../../services/users.httpsservice';
import { LanguageService } from 'dist/shared-lib';
import { MatDialog } from '@angular/material/dialog';
import { UserInviteFormComponent } from '../../components/userscomps/invite-form/user-invite-form/user-invite-form.component';
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
    private dialog: MatDialog
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
  toggle(id: number, isActive: boolean) {
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

  async activate(id: number) {
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
  async deactivate(id: number) {
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
}
