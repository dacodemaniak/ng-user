import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './shared/services/fake-backend.service';
import { HomeComponent } from './pages/home/home.component';

import { UiModule } from './shared/modules/ui/ui.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './shared/services/localization.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function translationInitializerFactory(
  translateService: TranslateService,
  localizationService: LocalizationService,
  injector: Injector
) {
  return (): Promise<void> => {
    return localizationService.init(translateService, injector);
  }
}

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    httpClient,
    './assets/i18n/',
    '.json'
  )
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    })
  ],
  providers: [
    fakeBackendProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: translationInitializerFactory,
      deps: [
        TranslateService,
        LocalizationService,
        Injector
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
