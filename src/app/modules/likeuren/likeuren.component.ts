import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiDataService } from './../../services/api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { LanguageService } from './../../services/language.service';

@Component({
  selector: 'app-likeuren',
  templateUrl: './likeuren.component.html',
  styleUrls: ['./likeuren.component.scss']
})
export class LikeurenComponent implements OnInit, OnDestroy {
  qty = 1;
  headerImage = '';
  products: any[] = [];
  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private apiDataService: ApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private shopCartService: ShoppingCartService,
    private languageService: LanguageService
  ) {
      this.apiDataService.getData('products/3').subscribe(
        (resp: any[]) => this.products = resp
      );
   }

  ngOnInit(): void {
    this.headerImage = 'licores1.jpg';
    window.scrollTo(0, 0);
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  addToCart(qt: any, product: any): void{
    let text = '';
    if (this.selectedLanguage === 'NL') {
      text = ' is toegevoegd aan de boodschappenlijst!';
    } else if (this.selectedLanguage === 'PT') {
      text = ' foi adicionado à lista ao carrinho';
    }
    const msg = product.name + text;
    this.openSnackBar(msg, 'Shoping Cart');
    this.shopCartService.addLineToCart({id: product.id, type: 3, name: product.name, qty: qt.qty, price: product.pricesell});
  }

  openSnackBar(message: string, action: string ): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/shopcart']);
    } );
  }



}
