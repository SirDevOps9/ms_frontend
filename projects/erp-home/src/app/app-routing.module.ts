import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERPRoutes } from './routes';

const routes = ERPRoutes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
