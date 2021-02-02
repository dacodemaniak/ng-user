import { LOCATION_INITIALIZED } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private _language: string;
  private _translateService: TranslateService;

  constructor() { }

  public get currentLanguage(): string {
    return this._language;
  }

  public set langue(language: string) {
    this._language = language;
    this._switch();
  }
  
  public init(translateService: TranslateService, injector: Injector): Promise<void> {
    return new Promise((resolve) => {
      console.log(`Okay, i'm ready to play`);
      

      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
        const userLanguage: string = window.navigator.language.split('-')[0];
        this._language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'fr';
        this._translateService = translateService;

        this._switch()
          .subscribe(() => {
            console.log(`Locales loaded and ready to translate to ${this._language}`);
            resolve(null);
          })
      })
    })
  }

  private _switch(): Observable<any> {
    return this._translateService.use(this._language);
  }
}
