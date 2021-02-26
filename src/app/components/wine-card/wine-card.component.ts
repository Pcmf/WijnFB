import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from './../../services/shopping-cart.service';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.scss']
})
export class WineCardComponent implements OnInit {
  @Output() selectWine = new EventEmitter<void>();
  @Output() addedToCart = new EventEmitter<string>();
  @Input() wine: any;
  @Input() selected: boolean | false | undefined;

  constructor(
    private shopCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  onSelect(): void{
    console.log('selected');
    this.selectWine.emit();
  }

  addToCart(): void{
    const msg = this.wine.name + ' is toegevoegd aan de boodschappenlijst!';
    this.addedToCart.emit(msg);
    this.shopCartService.addLineToCart({id: this.wine.id, name: this.wine.name, qty: 1, price: this.wine.pricesell});
  }

}
