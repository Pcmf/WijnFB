import { Component, OnDestroy, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { HeaderImageService } from './../../services/header-image.service';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './../../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  subscription: Subscription | undefined;
  shownav = false;
  showFavorite = false;
  shopcartLoad = 0;
  backgroundImage: string | undefined;
  selectedLanguage: string | undefined;
  constructor(
    private apiService: ApiDataService,
    private shopcartService: ShoppingCartService,
    private headerImageService: HeaderImageService,
    private cookieService: CookieService,
    private languageService: LanguageService
  ) {   }

  ngOnInit(): void {
/*     this.subscription = this.apiService.isLoged.subscribe(
      res => {
        this.shownav = res;
      }
    ); */
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => {
        this.selectedLanguage = res;
      }
    );
    this.subscription = this.shopcartService.shopcartLoad.subscribe(
      res => {
        this.shopcartLoad = res;
      }
    );
    this.subscription = this.headerImageService.imageBackground.subscribe(
      img => this.backgroundImage = img
    );
    if (this.cookieService.check('favorits')){
      this.showFavorite = true;
    }
    if (this.cookieService.check('Language')){
      this.changeLanguage(this.cookieService.get('Language'));
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
   }

   ToggleSidenav(): void {
     this.sidenavToggle.emit();
   }

   changeLanguage(lang: string): void{
     this.languageService.menuLanguageChange(lang);
     this.cookieService.set('Language', lang, { path: '/', sameSite: 'Lax'});
   }

}
