import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentService, MultiTranslateHttpLoader, SharedLibModule } from 'shared-lib';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { ERPInterceptor, MicrotecAuthLibModule } from 'microtec-auth-lib';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ClipboardModule } from 'ngx-clipboard';
import { DeferLoadModule } from '@trademe/ng-defer-load';

import { ToastrModule } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { PrimeSharedModule } from 'libs/shared-lib/src/lib/prime-module/prime.module';
import { LayoutModule } from './_metronic/layout';
import { HelpPagesModule } from './modules/HelpPages/help-pages.module';

// @NgModule({
//   declarations: [AppComponent, LayoutComponent],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     TranslateModule.forRoot({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: (http: HttpClient) =>
//           new MultiTranslateHttpLoader(http, {
//             resources: [
//               { prefix: './assets/langs/shared/', suffix: '.json' },
//               { prefix: './assets/langs/adminportal/', suffix: '.json' },
//             ],
//           }),
//         deps: [HttpClient],
//       },
//     }),
//     AuthModule.forRoot({
//       config: environment.openIdConfig,
//     }),
//     MicrotecAuthLibModule,
//     SharedLibModule,
//     BrowserAnimationsModule,
//     CookieModule.withOptions(),
//   ],
//   providers: [
//     { provide: EnvironmentService, useValue: environment },
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: ERPInterceptor,
//       multi: true,
//     },
//     { provide: AbstractSecurityStorage, useClass: CustomStorageService },
//   ],
//   bootstrap: [AppComponent],
// })
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    // #fake-end#
    AppRoutingModule,
    TranslateModule.forRoot(),
    InlineSVGModule.forRoot(),
    NgbModule,
    DeferLoadModule,
    HelpPagesModule,

    ToastrModule.forRoot({
      timeOut: 3000,
    }),
    MicrotecAuthLibModule,
    SharedLibModule,
    PrimeSharedModule,
    BrowserAnimationsModule,
    CookieModule.withOptions(),
    LayoutModule
  ],
  providers: [
    DynamicDialogRef,
    MessageService,
    DialogService,
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
