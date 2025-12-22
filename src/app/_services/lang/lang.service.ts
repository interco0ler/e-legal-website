import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { languages } from '../../_config/languages.config';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private langSubject: BehaviorSubject<any>;
  public lang: Observable<any>;
  public currentLang: any; // INFO LANGUAGE
  public list: any = languages;

  constructor(
    private storage: StorageService,
    private translate: TranslateService,
  ) {
    this.langSubject = new BehaviorSubject<any>(null);
    this.lang = this.langSubject.asObservable();
    this.getSavedLang();
  }

  //UPDATE LANGUAGE
  public setCurrentLang(value: any) {
    this.langSubject.next(value);
    this.storage.set('lang', value);
  }

  public getSavedLang() {
    const lang = JSON.parse(this.storage.get('lang'));
    const findLang = languages.find((item: any) => item.iso == (lang?.iso || 'en-US'));
    this.langSubject.next(findLang);

    this.lang.subscribe((res) => {
      this.translate.use(res.iso);
      this.currentLang = res;
    });

    if (!lang){
      this.setCurrentLang(findLang);
    }
  }
}
