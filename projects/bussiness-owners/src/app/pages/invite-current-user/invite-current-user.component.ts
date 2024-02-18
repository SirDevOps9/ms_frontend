import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserListResponse } from '../../models/users/userlist.response';
import { UserService } from '../../services/users.httpsservice';
import { AddExistUser } from '../../models/users/add-existed-user';
import { LanguageService, LogService, ToasterService } from 'shared-lib';

@Component({
  selector: 'invite-current-user',
  templateUrl: './invite-current-user.component.html',
  styleUrls: ['./invite-current-user.component.css'],
})
export class InviteCurrentUserComponent implements OnInit {
  userForm: FormGroup;
  userData: UserListResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private logService: LogService,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    
    this.userForm = this.fb.group({
      selectedOption: ['', Validators.required],
    });

    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.userData = res;
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const selectedEmail = this.userForm.get('selectedOption')?.value;
      const selectedUser = this.userData.find(
        (user) => user.email === selectedEmail
      );

      if (selectedUser) {
        const addSelectedExistedUser: AddExistUser = {
          userId: selectedUser.id,
          plans: [],
          subDomains: [],
        };

        this.userService.addExistUser(addSelectedExistedUser).subscribe({
          next: (response) => {
            this.logService.log(response, 'Invitation sent successfully:');

            this.toasterService.showSuccess(
              'Success',
              this.languageService.transalte('User.InvitationSentSuccessfully')
            );
  
          },
         
        });
      }
    }
  }



  onBack() {}
}
