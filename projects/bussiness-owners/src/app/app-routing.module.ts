import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BORoutes } from './routes';

const routes = BORoutes;
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
