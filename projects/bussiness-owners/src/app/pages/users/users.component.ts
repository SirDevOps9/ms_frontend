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
  toggle(id: number, isActive: boolean) {
    if (!isActive) this.activate(id);
    else this.deactivate(id);
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
