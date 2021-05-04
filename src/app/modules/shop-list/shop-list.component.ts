import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { ApiDataService } from './../../services/api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { WineDetailDialog } from '../detail-dialog/wine-detail-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { Wine } from 'src/app/interfaces/Interfaces';
import { Observable, Subscription } from 'rxjs';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from './../../services/language.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit, OnDestroy {

  cart: Wine[] = [];
  total$: Observable<number> | undefined;
  headerImage = '';
  showFinalize = false;
  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private shopCartService: ShoppingCartService,
    private apiService: ApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    // tslint:disable-next-line:variable-name
    private _location: Location,
    private route: Router,
    private languageService: LanguageService
  ) {
    this.cart = shopCartService.getShopCartList();
   }

   updateTotal(line: Wine): void{
    this.shopCartService.updateCartQty(line);
    this.total$ = this.shopCartService.shopcartTotal;
   }


   selectToShowDetail(line: Wine): void{
      this.apiService.getData('wines/' + line.id).subscribe(
        ( res: Wine[]) => this.showDetail(res[0])
      );
   }

   showDetail(wine: Wine): void{
    const dialogRef = this.dialog.open(WineDetailDialog, {
      data: wine
    });
  }

  removeLine(value: Wine): void{
    let title = '';
    let subtitle = '';
    if (this.selectedLanguage === 'NL') {
       title = 'Aandacht!';
       subtitle = 'Weet u zeker dat u ' + value.name + '?';
    } else if (this.selectedLanguage === 'PT') {
      title = 'Atenção!';
      subtitle = 'Tem a certeza que quer remover ' + value.name + '?';
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title, subtitle}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          let msg = '';
          if (this.selectedLanguage === 'NL') {
            msg = ' was verwijderd!';
          } else if (this.selectedLanguage === 'PT') {
            msg = ' foi removido!';
          }
          const line = {id: value.id, type: 1, name: value.name, qty: value.qty, price: value.pricesell};
          this.openSnackBar(`${line.name} ${msg}`, '');
          this.shopCartService.removeLineFromCart(line);
          this.cart = this.shopCartService.getShopCartList();
          this.total$ = this.shopCartService.shopcartTotal;
        }
      }
    );


  }

  clearShoppingCart(): void{
    let title = '';
    let subtitle = '';
    if (this.selectedLanguage === 'NL') {
       title = 'Aandacht!'
       subtitle = 'Weet u zeker dat u de winkelwagen wilt schoonmaken?';
    } else if (this.selectedLanguage === 'PT') {
      title = 'Atenção!'
      subtitle = 'Tem certeza de que deseja limpar o carrinho de compras?';
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title, subtitle}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.clearCart();
        }
      }
    );
  }

  private clearCart(): void{
    this.cart = [];
    this.shopCartService.clearCart();
    this.total$ = this.shopCartService.shopcartTotal;
  }


  openSnackBar(message: string, action: string ): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });


  }


  ngOnInit(): void {
    this.total$ = this.shopCartService.shopcartTotal;
    this.headerImage = 'shop3_sm.jpg';
    window.scrollTo(0, 0);
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  goBack(): void{
    this._location.back();
  }

  showFinalizeForm(): void{
    setTimeout(() => {
      window.scrollBy({top: 600, left: 0, behavior: 'smooth'});
    }, 100);
  }

  cancelFinalize(): void{
    this.showFinalize = false;
  }

  finalizeOrder(data: any): void{
    const obj = {orderInfo: data, shopcart: this.shopCartService.cart, lang: this.selectedLanguage};
    this.apiService.setData('order/', obj).subscribe(
      (resp: any) => {
        let msg = '';
        if (this.selectedLanguage === 'NL') {
          msg = 'Uw bestelling is succesvol verzonden. We nemen spoedig contact met u op. Bedankt';
        } else if (this.selectedLanguage === 'PT') {
          msg = 'Seu pedido foi enviada com sucesso. Entraremos em contato em breve. Obrigado';
        }
        this.openSnackBar(msg, '');
        this.clearCart();
        this.shopCartService.clearCart();
        setTimeout(() => {
          this.route.navigate(['/']);
        }, 2000);
      }
    );
  }

}
