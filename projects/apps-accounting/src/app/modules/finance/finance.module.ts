import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbLabel, Modules, SharedLibModule } from 'shared-lib';
import { LayoutPageComponent } from 'apps-shared-lib';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'microtec-auth-lib';
import { TreauryDefinitionListComponent } from './pages/treasury-definition/treaury-definition-list/treaury-definition-list.component';
import { AddTreasuryComponent } from './components/add-treasury/add-treasury.component';
import { EditTreasuryComponent } from './components/edit-treasury/edit-treasury.component';
import { ViewTreasuryComponent } from './components/view-treasury/view-treasury.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

const routes: Routes = [



  {
    path: '',
    component: LayoutPageComponent,

    data: {
      moduleId: Modules.Accounting,
    },
    children: [
      {
        path: 'treasury-list',
        component:TreauryDefinitionListComponent ,
        canActivate: [AuthGuard],
        data: {
          breadcrumb: BreadcrumbLabel.TREASURY_LIST,
        },
      }
    ],
  },
]; 


@NgModule({
  declarations: [
  
    TreauryDefinitionListComponent,
        AddTreasuryComponent,
        EditTreasuryComponent,
        ViewTreasuryComponent,
        ConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedLibModule,
    RouterModule.forChild(routes)
  ]
})
export class FinanceModule { }
