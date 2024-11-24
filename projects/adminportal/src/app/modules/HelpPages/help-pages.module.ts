import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHelpPageComponent } from './pages/list-help-page/list-help-page.component';
import { AddHelpPageComponent } from './pages/add-help-page/add-help-page.component';
import { HelpPagesRoutingModule } from './HelpPages-routing.module';
import { SharedLibModule } from 'shared-lib';
import { EditHelpsPagesComponent } from './pages/edit-helps-pages/edit-helps-pages.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [ListHelpPageComponent, AddHelpPageComponent, EditHelpsPagesComponent],
  imports: [
    CommonModule,
    HelpPagesRoutingModule,
    SharedLibModule,
    ToastrModule,
    AngularEditorModule,
  ],
})
export class HelpPagesModule {}
