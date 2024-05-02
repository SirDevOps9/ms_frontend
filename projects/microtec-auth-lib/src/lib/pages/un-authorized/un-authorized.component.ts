import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.css'],
})
export class UnAuthorizedComponent implements OnInit {
  message: string;
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.message = 'You are not authorized to access this page';
    this.titleService.setTitle('UnAuthorized');
  }
}
