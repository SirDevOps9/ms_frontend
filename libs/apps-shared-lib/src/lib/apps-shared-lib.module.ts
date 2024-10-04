import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';
import { LandingPageComponent } from 'apps-shared-lib';
import { MultiTranslateHttpLoader, SharedLibModule } from 'shared-lib';
import { SequenceModule } from './modules/sequence/sequence.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ActtachmentViewComponent } from './pages/attachment-view/acttachment-view/acttachment-view.component';

const routes: Routes = [
  { path: 'attachment-view', component: ActtachmentViewComponent },
];
@NgModule({
  declarations: [LandingPageComponent  ,ActtachmentViewComponent],
  imports: [
    LayoutModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    SharedLibModule,
    SequenceModule,
    RouterModule.forChild(routes), // Add the routes here

    TranslateModule.forRoot({

    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient) =>
        new MultiTranslateHttpLoader(http, {
          resources: [
            { prefix: './assets/langs/shared /', suffix: '.json' },
          ],
        }),
      deps: [HttpClient],
    },
  }),

  ],
  exports: [
  ],
})
export class AppsSharedLibModule {}
