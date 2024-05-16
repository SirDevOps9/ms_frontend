import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterService } from 'shared-lib';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss'
})
export class LayoutSidebarComponent implements OnInit {
  @Output() sidebaropend = new EventEmitter<boolean>();
  sidebarOpen: boolean = false;
  ngOnInit(): void {
    console.log(this.RouterService.snapshot, "currentId");
    
    //this.activeTag()
  }
  toggleSidebar() {
    if (this.sidebarOpen == true) {
      this.sidebarOpen = false;
      
      this.sidebaropend.emit(false);
    } else {
      this.sidebarOpen = true;
      this.sidebaropend.emit(true);

    }
  }
  activeTag(id: any) {
    const targetElementId = document.getElementById(id);
    var test = document.querySelector('.active_link');
    test?.classList.remove('active_link');
    targetElementId?.classList.add('active_link');
  }
  constructor(
    private RouterService:RouterService
  ){}
}
