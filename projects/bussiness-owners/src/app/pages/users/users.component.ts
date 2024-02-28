import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { UserService } from '../../services/users.httpsservice';
import {
  BaseDto,
  LanguageService,
  LogService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { MatDialog } from '@angular/material/dialog';
import { UserInviteFormComponent } from '../../components/userscomps/invite-form/user-invite-form/user-invite-form.component';

import { bouserdetails } from '../../components/userscomps/bouserdetails/bouserdetails.component';
import { City } from '../../models/users/cities.model';
import { forkJoin } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userData: UserListResponse[];
  users: any[] = [];
  user: any[] = [];

  checked: boolean = true;
  userEditDialog: boolean = false;
  addUser: boolean = false;
  cities!: City[];
  value: string | undefined;
  selectedCities!: City[];
  selectedDomain!: any[];
  selectedActions!: any[];
  domains: BaseDto[];
  actions: BaseDto[];
  ref: DynamicDialogRef | undefined;
  @ViewChild('dt') dt: any | undefined;
  constructor(
    public languageService: LanguageService,
    private toasterService: ToasterService,
    private userService: UserService,
    private dialog: DialogService,
    private router: RouterService,
    private logService: LogService
  ) {}
  ngOnInit() {
    forkJoin([
      this.userService.subDomainDropDown(),
      this.userService.platformDropDown(),
    ]).subscribe(([subDomainData, platformData]) => {
      this.domains = subDomainData.response;
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
    //this.ref.close();
    // dialogRef.afterClosed().subscribe((result: UserListResponse) => {
    //   if (result as UserListResponse) this.userData.push(result);
    // });
    this.ref.onClose.subscribe((data: UserListResponse) => {
      if(data){
        this.logService.log("000")
      }
   
    
  });
}
  
  // applyFilterGlobal($event:any, stringVal:any) {
  //   this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }

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
  editeUser(id: any) {
    this.userData.forEach((element: any) => {
      if (element.id == id) {
        this.user = [element];
      }
    });
    this.logService.log(id);
    //this._LogService.log(this.user)
    this.userEditDialog = true;
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
  closeAdd() {
    this.addUser = false;
  }
  closeedite() {
    this.userEditDialog = false;
  }
  async editUser(Id: string) {
    const dialogRef = this.dialog.open(bouserdetails, {
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
}
