import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { StorageService } from './localstorage.service';
import { StorageKeys } from '../constants/storagekeys';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  get Lang(): string {
    let currentLanguage =
      this.storageService.getItem(StorageKeys.LANG_KEY) === 'en' ? 'ar' : 'en';
    return currentLanguage;
  }

  getTranslation(key: string): Observable<string> {
    return this.transalteService.get(key);
  }

  transalte(key: string) {
    return this.transalteService.instant(key);
  }

  setDefaultLang(lang: string) {
    this.storageService.setItem(StorageKeys.LANG_KEY, lang);
  }

  setLang() {
    let currentLanguage = this.storageService.getItem(StorageKeys.LANG_KEY);
    currentLanguage = currentLanguage || 'en';
    this.transalteService.use(currentLanguage);
  }

  toggleLanguage(): void {
    let currentLanguage =
      this.storageService.getItem(StorageKeys.LANG_KEY) === 'en' ? 'ar' : 'en';
    this.storageService.setItem(StorageKeys.LANG_KEY, currentLanguage);
    this.transalteService.use(currentLanguage);
  }
  constructor(
    private transalteService: TranslateService,
    private storageService: StorageService,
    private cookieService:CookieService
  ) {}
}
