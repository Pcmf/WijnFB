import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiDataService } from 'src/app/services/api-data.service';
import { LanguageService } from 'src/app/services/language.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-olive-oill',
  templateUrl: './olive-oill.component.html',
  styleUrls: ['./olive-oill.component.scss']
})
export class OliveOillComponent implements OnInit, OnDestroy {
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
      this.apiDataService.getData('products/2').subscribe(
        (resp: any[]) => this.products = resp
      );
   }

  ngOnInit(): void {
    this.headerImage = 'olival.jpg';
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
      text = ' foi adicionado ao carrinho';
    }
    const msg = product.name + text;
    this.openSnackBar(msg, 'Shoping Cart');
    this.shopCartService.addLineToCart({id: product.id, type: 2, name: product.name, qty: qt.qty, price: product.pricesell});
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
