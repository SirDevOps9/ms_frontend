import { Component, OnInit } from '@angular/core';
import { AuthProxy, AuthService } from 'microtec-auth-lib';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
})
export class LayoutPageComponent implements OnInit {
  ngOnInit(): void {
    this.langService.setLang();

    this.authProxy
      .loadPermissionTree()
      .subscribe((treedata) => this.authService.saveUserPermissions(treedata));
  }
  sidebarOpen: boolean = false;
  toggleSidebar(event: boolean) {
    this.sidebarOpen = event;
  }

  constructor(
    private langService: LanguageService,
    private authProxy: AuthProxy,
    private authService: AuthService
  ) {}
}
