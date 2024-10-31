import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MicrotecAuthLibModule, ERPInterceptor } from 'microtec-auth-lib';
import { CookieModule } from 'ngx-cookie';
import { HomePageComponent } from 'projects/erp-home/src/app/home-page/home-page.component';
import { MultiTranslateHttpLoader, SharedLibModule, EnvironmentService } from 'shared-lib';
import { environment } from '../environments/environment';
import { AppsSharedLibModule } from 'apps-shared-lib';

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new MultiTranslateHttpLoader(http, {
            resources: [
              { prefix: './assets/langs/auth/', suffix: '.json' },
              { prefix: './assets/langs/erphome/', suffix: '.json' },
              { prefix: './assets/langs/shared/', suffix: '.json' },
              { prefix: './assets/langs/sales/', suffix: '.json' },
            ],
          }),
        deps: [HttpClient],
      },
    }),
    MicrotecAuthLibModule,
    SharedLibModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CookieModule.withOptions(),
    AppsSharedLibModule
  ],
  providers: [
    { provide: EnvironmentService, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ERPInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
