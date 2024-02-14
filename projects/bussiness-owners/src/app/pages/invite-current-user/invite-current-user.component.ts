import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'invite-current-user',
  templateUrl: './invite-current-user.component.html',
  styleUrls: ['./invite-current-user.component.css']
})
export class InviteCurrentUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
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