import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';
import { LandingPageComponent } from 'apps-shared-lib';
import { MultiTranslateHttpLoader, SharedLibModule } from 'shared-lib';
import { SequenceModule } from './modules/sequence/sequence.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [LandingPageComponent ],
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
