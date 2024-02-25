import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-Updateuserbyadmin',
  templateUrl: './Updateuserbyadmin.component.html',
  styleUrls: ['./Updateuserbyadmin.component.css']
})
export class UpdateuserbyadminComponent implements OnInit {
  profileForm: FormGroup;
  subdomains: any[] = [];
  platformplans: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [''],
      email: [''],
      photo: [''],
      subdomain: [[]],
      platformplan: [[]]
    });
  }
  

  submitForm() {
    // You can access form values using this.profileForm.value
    console.log(this.profileForm.value);
    // You would typically send this data to a server for processing
  }

}
