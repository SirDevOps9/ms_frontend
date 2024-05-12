import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { MaterialModule } from './material/material.module';
import { SharedFormComponent } from './shared-form/shared-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GetElementByIdPipe } from './pipes/get-element-by-id.pipe';
import { ReducePipe } from './pipes/reduce.pipe';
import { GetLabelByIdPipe } from './pipes/get-label-by-id.pipe';
import { ToastrModule } from 'ngx-toastr';
import { FindCamelCasePipe } from './pipes/find-camel-case.pipe';

const sharedModules = [
  MaterialModule,
  PrimengModule,
  ReactiveFormsModule,
  FormsModule,
  ToastrModule
];

@NgModule({
  declarations: [
    SharedFormComponent,

    GetElementByIdPipe,
    ReducePipe,
    GetLabelByIdPipe,
    FindCamelCasePipe
  ],
  imports: [CommonModule, ...sharedModules],
  exports: [
    ...sharedModules,
    SharedFormComponent,
   
    GetElementByIdPipe,
    ReducePipe,
    GetLabelByIdPipe,
    FindCamelCasePipe
  ],
})
export class SharedModule {}
