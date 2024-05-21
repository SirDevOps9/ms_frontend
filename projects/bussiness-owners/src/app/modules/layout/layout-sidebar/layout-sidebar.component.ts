import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterService } from 'shared-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss'
})
export class LayoutSidebarComponent implements OnInit {
  @Output() sidebaropend = new EventEmitter<boolean>();
  sidebarOpen: boolean = false;
  activeTag: string;

  ngOnInit(): void {
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

    this.router.navigateTo(`/${tag}`)
    if(this.router.getCurrentUrl() === tag) {
      return true
    }
    // this.activeTag = tag;
    return false
  }
  constructor(
    public router:RouterService,
    private cdr: ChangeDetectorRef,
  ){}
}
