import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { LayoutSidebarComponent } from './layout-sidebar/layout-sidebar.component';
import { layoutRoutes } from './layoutRoutes';
import { SharedLibModule } from 'shared-lib';
import { RouterModule } from '@angular/router';
import { ModuleListComponent } from '../../components/module-list/module-list.component';

const routes = layoutRoutes;
@NgModule({
  declarations: [
    LayoutPageComponent,
    LayoutSidebarComponent,
    LayoutHeaderComponent,
    ModuleListComponent,
  ],
  imports: [CommonModule, SharedLibModule, RouterModule.forChild(routes)],
})
export class LayoutModule {}
