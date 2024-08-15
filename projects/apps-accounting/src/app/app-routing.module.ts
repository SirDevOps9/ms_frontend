import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ERPRoutes } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(ERPRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
