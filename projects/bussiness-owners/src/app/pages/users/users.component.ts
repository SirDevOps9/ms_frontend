import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { ToasterService } from 'shared-lib';
import { UserService } from '../../services/users.httpsservice';
import { LanguageService ,LogService } from 'shared-lib';
import { MatDialog } from '@angular/material/dialog';
import { UserInviteFormComponent } from '../../components/userscomps/invite-form/user-invite-form/user-invite-form.component';
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userData: UserListResponse[];
  users:any[]=[];
  user:any[]=[];
  
  checked: boolean = true;
  userEditDialog: boolean = false;
  addUser: boolean = false;
  cities!: City[];
  value: string | undefined;
  selectedCities!: City[];
  selectedDomain!: any[];
  selectedActions!: any[];
  domains: any[] = [
    { id: 1, name: 'Marketing' },
    { id: 2, name: 'Sales' },
    { id: 3, name: 'Support' },
  ];

  actions: any[] = [
    { id: 1, name: 'Read' },
    { id: 2, name: 'Write' },
    { id: 3, name: 'Manage' },
  ];
  @ViewChild('dt') dt:any | undefined;
  constructor(
    public languageService: LanguageService,
    private toasterService: ToasterService,
    private userService: UserService,
    private dialog: MatDialog,
    private _LogService: LogService,

  ) {}
  ngOnInit() {
    this.getAllUsers();
    this.users=[
      {
        id: "010",
        name: "aaaaaa",
        email: "aaaaaaa",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "011",
        name: "bbbbbbbb",
        email: "bbbbbbbbb",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "012",
        name: "aaaaaa",
        email: "aaaaaaa",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "013",
        name: "ccccccccc",
        email: "ccccccccc",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "014",
        name: "ccccccccc",
        email: "cccccccccccccc",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "014",
        name: "ccccccccc",
        email: "cccccccccccccc",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "014",
        name: "ccccccccc",
        email: "cccccccccccccc",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "014",
        name: "ccccccccc",
        email: "cccccccccccccc",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "014",
        name: "ccccccccc",
        email: "cccccccccccccc",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      {
        id: "014",
        name: "ccccccccc",
        email: "cccccccccccccc",
        countryId: "0",
        phone: "string",
        password: "string",
        isMailSent: false,
        isConfirmed: false,
        roleId: "number",
        identityId: "string",
        typeId: "number",
        isActive: false,
        lastLoginDate: "string",
        invitationStatus: "number",
      },
      
    

    ]
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

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
  // applyFilterGlobal($event:any, stringVal:any) {
  //   this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }

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
  editeUser(id:any){
    this.userData.forEach((element:any) => {
      if(element.id==id){
       this.user=[element]
      }
    });
    this._LogService.log(id)
    //this._LogService.log(this.user)
    this.userEditDialog=true
  }
  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  addNewUser(){
    if(this.addUser==false){
      this.addUser=true
    }else{
      this.addUser=false
    }
  }
  closeAdd(){
    this.addUser=false
  }
  closeedite(){
    this.userEditDialog=false
  }
}
