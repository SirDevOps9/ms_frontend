import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TagAddComponent } from './components/tag-add/tag-add.component';
import { TagEditComponent } from './components/tag-edit/tag-edit.component';
import { TagListComponent } from './pages/tags/tag-list/tag-list.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    data: {
      moduleId: Modules.GeneralSettings,
    },
    children: [
      {
        path: '',
        component: TagListComponent,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.tag_list,
        },
      },

    ],
  },
];

@NgModule({
  declarations: [
    TagListComponent,
    TagAddComponent,
    TagEditComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
})
export class GeneralSettingModule {}
