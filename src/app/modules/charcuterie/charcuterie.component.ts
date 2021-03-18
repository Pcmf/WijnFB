import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LanguageService } from './../../services/language.service';

@Component({
  selector: 'app-charcuterie',
  templateUrl: './charcuterie.component.html',
  styleUrls: ['./charcuterie.component.scss']
})
export class CharcuterieComponent implements OnInit, OnDestroy {


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
    this.apiDataService.getData('products/5').subscribe(
      (resp: any[]) => this.products = resp
    );
  }

  ngOnInit(): void {
    const num = Math.floor(Math.random() * 2) + 1;
    this.headerImage = 'charcuterie' + num + '.jpg';
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
    window.scrollTo(0, 0);
  }

  addToCart(qt: any, product: any): void {
    let text = '';
    if (this.selectedLanguage === 'NL') {
      text = ' is toegevoegd aan de boodschappenlijst!';
    } else if (this.selectedLanguage === 'PT') {
      text = ' foi adicionado à lista ao carrinho';
    }
    const msg = product.name + text;
    this.openSnackBar(msg, 'Shoping Cart');
    this.shopCartService.addLineToCart({ id: product.id, type: product.type, name: product.name, qty: qt.qty, price: product.pricesell });
  }

  openSnackBar(message: string, action: string): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/shopcart']);
    });
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

}
