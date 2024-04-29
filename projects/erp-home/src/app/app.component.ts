import { Component, OnInit } from '@angular/core';
import { AuthHttpService, AuthService } from 'microtec-auth-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // this.authHttp
    //   .loadSideMenu()
    //   .subscribe((res) => this.currentUserservice.saveSideMenu(res));
  }

  title = 'erp-home';

  constructor(
    private currentUserservice: AuthService,
    private authHttp: AuthHttpService
  ) {}
}
