import { Component, OnInit, PipeTransform } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { ToasterService } from 'shared-lib';
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
    private userService: UserService
  ) {}
  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.userData = res;
      },
    });
  }
  async activateAndDeactivate(id: number, currentstatus: boolean) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      this.userService.ActivateAndDeactivate(id).subscribe({
        next: () => {
          if (currentstatus)
            this.toasterService.showSuccess(
              'Success',
              this.languageService.transalte('User.UserDeactivatedSuccessfully')
            );
          else
            this.toasterService.showSuccess(
              'Success',
              this.languageService.transalte('User.UserActivatedSuccessfully')
            );

          let indexToChange = this.userData.find((item) => item.id === id);
          indexToChange!.isActive = !currentstatus;
        },
      });
    }
  }
}
