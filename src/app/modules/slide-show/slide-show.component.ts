import { Component, OnInit } from '@angular/core';
/* import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel'; */

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
