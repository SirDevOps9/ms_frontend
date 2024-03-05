import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { UserService } from '../../services/users.httpsservice';
import {
  BaseDto,
  EnvironmentService,
  LanguageService,
  LogService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { UserInviteFormComponent } from '../../components/userscomps/invite-form/user-invite-form/user-invite-form.component';

import { bouserdetails } from '../../components/userscomps/bouserdetails/bouserdetails.component';
import { City } from '../../models/users/cities.model';
import { forkJoin } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [RouterService],
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userData: UserListResponse[];
  checked: boolean = true;
  userEditDialog: boolean = false;
  addUser: boolean = false;
  cities!: City[];
  value: string | undefined;
  selectedCities!: City[];
  selectedDomain!: any[];
  selectedActions!: any[];
  actions: BaseDto[];
  ref: DynamicDialogRef | undefined;
  @ViewChild('dt') dt: any | undefined;
  constructor(
    public languageService: LanguageService,
    private toasterService: ToasterService,
    private userService: UserService,
    private dialog: DialogService,
    private router: RouterService,
    private logService: LogService,
    private titleService: Title,
    private env: EnvironmentService,
  ) { }
  ngOnInit() {
    this.titleService.setTitle('Users');
    this.userService.platformDropDown().subscribe(platformData => {
      this.actions = platformData.response;
    });
    this.getAllUsers();
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
  getAllUsers() {
    this.userService.getAll(this.router.currentId).subscribe({
      next: (res) => {
        this.userData = res.response;
      },
    });
  }
  toggle(id: string, isActive: boolean) {
    if (!isActive) this.activate(id);
    else this.deactivate(id);
  }

  resendInvitation(id: string) {
    this.userService.resendInvitation(id).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('User.Inviteform.Success'),
          this.languageService.transalte('User.Inviteform.InviationSent')
        );
      },
    });
  }
  openInviteModal() {
    this.ref = this.dialog.open(UserInviteFormComponent, {
      width: '600px',
      height: '600px',
    });
    this.ref.onClose.subscribe((result: UserListResponse) => {
      if (result as UserListResponse) this.userData.push(result);
    });

  }
  getProfilePic(id: string){
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + id
    
    
    
    
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
    } else {
      this.userData.forEach((element: any) => {
        if (element.id == id) {
          console.log(element.isActive);
          element.isActive = false;
        }
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
    } else {
      this.userData.forEach((element: any) => {
        if (element.id == id) {
          console.log(element.isActive);
          element.isActive = true;
        }
      });
    }
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  addNewUser() {
    if (this.addUser == false) {
      this.addUser = true;
    } else {
      this.addUser = false;
    }
  }

  async editUser(Id: string) {
    this.ref = this.dialog.open(bouserdetails, {
      width: '800px',
      height: '700px',
      data: { Id: Id },
    });
    // dialogRef.afterClosed().subscribe((result: UserListResponse) => {
    //   if (result as UserListResponse) this.userData.push(result);
    // });
    //  this.logService.log('users/bouserdetails/' + Id);
    // this.router.navigateTo('users/bouserdetails/' + Id);
  }
  changed(e: any, id: string) {
    if (e.checked === false) {
      this.deactivate(id);
    } else {
      this.activate(id);
    }
  }
}
