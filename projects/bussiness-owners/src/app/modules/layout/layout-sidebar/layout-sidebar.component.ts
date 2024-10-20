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

  menuItems = [
    { name: 'Dashboard', icon: 'pi pi-th-large', subMenu: null },
    { name: 'Category', icon: 'pi pi-folder', subMenu: ['HTML & CSS', 'JavaScript', 'PHP & MySQL'], open: false },
    { name: 'Posts', icon: 'pi pi-book', subMenu: ['Web Design', 'Login Form', 'Card Design'], open: false },
    { name: 'Analytics', icon: 'pi pi-chart-bar', subMenu: null },
    { name: 'Chart', icon: 'pi pi-chart-line', subMenu: null },
    { name: 'Plugins', icon: 'pi pi-plug', subMenu: ['UI Face', 'Pigments', 'Box Icons'], open: false },
    { name: 'Explore', icon: 'pi pi-compass', subMenu: null },
    { name: 'History', icon: 'pi pi-clock', subMenu: null },
    { name: 'Setting', icon: 'pi pi-cog', subMenu: null }
  ];

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleSubMenu(item: any): void {
    console.log("88888888888888");
    
    console.log("00" , item);
    item.open = !item.open;
    console.log("11" , item);

    
  }
  ngOnInit(): void {
    this.currentLanguage = this.languageService.getLang();
    console.log('currentlang from buissines', this.currentLanguage);
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
