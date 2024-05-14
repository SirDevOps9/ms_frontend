import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Logout');
    this.authService.clearAllStorage();
    this.authService.logout();
  }
}
