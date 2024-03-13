import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FieldValidationsComponent } from 'projects/shared-lib/src/lib/form-components';
import { ConfirmInvitedErpUserComponent } from './pages/confirm-invited-erp-user/confirm-invited-erp-user.component';
import { LayoutComponent, RouterService, SharedLibModule } from 'shared-lib';
import { LayoutModule } from 'projects/bussiness-owners/src/app/modules/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'users/userconfirmation/:id', component: ConfirmInvitedErpUserComponent }
    ]
@NgModule({
  providers: [RouterService],
  declarations: [FieldValidationsComponent , ConfirmInvitedErpUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    SharedLibModule,
    LayoutModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {}),
  ],
  exports: [FieldValidationsComponent],
})
export class AppsSharedLibModule {}
