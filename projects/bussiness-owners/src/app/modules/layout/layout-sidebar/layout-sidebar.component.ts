import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cultures, LanguageService, RouterService } from 'shared-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss',
})
export class LayoutSidebarComponent implements OnInit {
  @Output() sidebaropend = new EventEmitter<boolean>();
  @Input() currentLanguage: Cultures | string;
  @Input() isSidebarClosed:any;
  sidebarOpen: boolean = false;
  activeTag: string;
  // isSidebarClosed = true;

  
  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleSubMenu(item: any): void {
    
    item.open = !item.open;

    
  }
  ngOnInit(): void {
    this.currentLanguage = this.languageService.getLang();
    // console.log(this.RouterService.snapshot, "currentId");
    //this.activeTag()
    
  }
  // toggleSidebar() {
  //   if (this.sidebarOpen == true) {
  //     this.sidebarOpen = false;

  //     this.sidebaropend.emit(false);
  //   } else {
  //     this.sidebarOpen = true;
  //     this.sidebaropend.emit(true);

  //   }
  // }
  // activeTag(id: any) {
  //   const targetElementId = document.getElementById(id);
  //   var test = document.querySelector('.active_link');
  //   test?.classList.remove('active_link');
  //   targetElementId?.classList.add('active_link');
  // }

  setActive(tag: string): boolean {
    this.router.navigateTo(`/${tag}`);
    if (this.router.getCurrentUrl() === tag) {
      return true;
    }
    // this.activeTag = tag;
    return false;
  }
  
  constructor(
    public router: RouterService,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService
  ) {}
}
