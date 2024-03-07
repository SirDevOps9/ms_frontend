import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyComponent } from './new-company/new-company.component';
import { MicrotecAuthLibModule } from 'microtec-auth-lib';
import { SharedLibModule } from 'shared-lib';

const routes: Routes = [
  {
    path: 'company/new',
    component: NewCompanyComponent,
  },
];

@NgModule({
  providers: [],
  declarations: [NewCompanyComponent],
  imports: [
    MicrotecAuthLibModule,
    SharedLibModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {}),
  ],
  exports: [],
})
export class CompanyModule {}
