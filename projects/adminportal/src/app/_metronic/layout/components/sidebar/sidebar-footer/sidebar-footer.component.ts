import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/adminportal/src/app/environments/environment';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss'],
})
export class SidebarFooterComponent implements OnInit {
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor() {}

  ngOnInit(): void {}
}
