import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { LanguageService } from './../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.scss']
})
export class WineCardComponent implements OnInit {
  @Output() selectWine = new EventEmitter<void>();
  @Output() addedToCart = new EventEmitter<string>();
  @Output() toggleToFavorit = new EventEmitter<number>();
  @Input() wine: any;
  @Input() selected: boolean | false | undefined;


  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private shopCartService: ShoppingCartService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }

  onSelect(): void{
    this.selectWine.emit();
  }

  addToCart(): void{
    let msg = this.wine.name + ' is toegevoegd aan de boodschappenlijst!';
    if (this.selectedLanguage === 'PT') {
      msg = this.wine.name + ' foi adicionado ao carrinho!';
    }
    this.addedToCart.emit(msg);
    if (this.wine.price_promo > 0){
      this.wine.pricesell = this.wine.price_promo;
    }
    this.shopCartService.addLineToCart({id: this.wine.id, type: 1, name: this.wine.name, qty: 1, price: this.wine.pricesell});
  }

  toggleFavorit(): void{
    this.wine.favorit = !this.wine.favorit;
    this.toggleToFavorit.emit(this.wine.id);
  }

}
