import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'apps-shared-lib';
import { ChatOfAccountListComponent } from './pages/chat-of-account-list/chat-of-account-list.component';
import { BreadcrumbLabel, SharedLibModule } from 'shared-lib';
import { AuthGuard } from 'microtec-auth-lib';
import { AutoCompleteModule } from 'primeng/autocomplete';

const routes: Routes = [
  {
    path: 'ChatOfAccount',
    component: LayoutPageComponent,
    children: [
      {
        path: 'ChatOfAccount',
        component:ChatOfAccountListComponent ,
       // canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.chart_of_account_list,
        }
      }
    ],
  },
];

@NgModule({
  declarations: [
    ChatOfAccountListComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    SharedLibModule,
    AutoCompleteModule,
    RouterModule.forChild(routes),
  ],
})
export class AccountModule {}
