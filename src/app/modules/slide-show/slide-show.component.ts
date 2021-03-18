import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from './../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit, OnDestroy {

  public hideArrows = false;
  public hideIndicators = false;

  public parentHeight = 'auto';
  public timings = '250ms ease-in';
  public autoplay = true;
  public interval = 5000;
  public loop = true;
  public color = 'accent';
  public slides = 4;
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public orientation = 'ltr';
  public log: string[] = ['Teste', 'MMais Log'];
  public maxWidth = 'auto';
  
  public proportion = 20;
  public maintainAspectRatio = false;
  public overlayColor = '#00000040';

  public slideHeight = '50%';
  images = ['./assets/bafarela_reserva.png', './assets/100-hectares.jpg', './assets/aveleda2.jpg', './assets/promo.png'];

  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;
  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

}
