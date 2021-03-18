import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selectLanguage = 'NL';
  private Language = new BehaviorSubject(this.selectLanguage);
  selectedLanguage = this.Language.asObservable();

  constructor() { }

  menuLanguageChange(value: string): void{
    this.Language.next(value);
  }
}
