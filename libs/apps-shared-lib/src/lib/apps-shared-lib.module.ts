import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from './modules/layout/layout.module';
import { LandingPageComponent } from 'apps-shared-lib';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    LayoutModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [],
})
export class AppsSharedLibModule {}
