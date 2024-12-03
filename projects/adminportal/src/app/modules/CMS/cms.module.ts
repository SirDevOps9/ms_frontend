import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { SharedLibModule } from 'shared-lib';
import { AddCMSComponent } from './pages/add-cms/add-cms.component';
import { ListCMSComponent } from './pages/list-cms/list-cms.component';
import { EditCMSComponent } from './pages/edit-cms/edit-cms.component';
import { CMSRoutingModule } from './CMS-routing.module';



@NgModule({
  declarations: [ListCMSComponent, AddCMSComponent, EditCMSComponent],
  imports: [
    CommonModule,
    CMSRoutingModule,
    SharedLibModule,
    ToastrModule,
    AngularEditorModule,
  ]
})
export class CmsModule { }
