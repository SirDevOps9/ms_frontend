import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FieldValidationsComponent } from './form-components';

@NgModule({
  declarations: [FieldValidationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [FieldValidationsComponent],
})
export class AppsSharedLibModule {}
