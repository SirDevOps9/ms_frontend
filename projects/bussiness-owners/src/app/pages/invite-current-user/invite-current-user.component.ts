import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserListResponse } from '../../models/users/userlist.response';
import { UserService } from '../../services/users.httpsservice';

@Component({
  selector: 'invite-current-user',
  templateUrl: './invite-current-user.component.html',
  styleUrls: ['./invite-current-user.component.css']
})
export class InviteCurrentUserComponent implements OnInit {
  userForm: FormGroup;
  userData: UserListResponse[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) { }

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
      console.log('Form submitted successfully!');
    }
  }

  onBack() {
    console.log('Navigating back...');
  }
}