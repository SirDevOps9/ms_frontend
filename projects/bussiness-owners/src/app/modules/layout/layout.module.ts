import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MicrotecAuthLibModule } from 'microtec-auth-lib';
import { SharedLibModule } from 'shared-lib';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutSidebarComponent } from './layout-sidebar/layout-sidebar.component';
import { LayoutComponent } from './layout-page/layout.component';

@NgModule({
  providers: [],
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutSidebarComponent,
  ],
  imports: [MicrotecAuthLibModule, SharedLibModule, HttpClientModule],
  exports: [],
})
export class LayoutModule {}
