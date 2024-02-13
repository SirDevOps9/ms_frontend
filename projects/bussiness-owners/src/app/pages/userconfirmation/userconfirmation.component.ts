import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from 'shared-lib';



@Component({
  selector: 'app-userconfirmation',
  templateUrl: './userconfirmation.component.html',
  styleUrls: ['./userconfirmation.component.css']
})
export class UserconfirmationComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder , private logService: LogService) { 
  }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptPolicy: [false, Validators.requiredTrue]
    });
  }
  submitForm() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.logService.log('user Information:', user);

    }
  }
}
