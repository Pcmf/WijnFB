import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { ApiDataService } from './../../services/api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { WineDetailDialog } from '../detail-dialog/wine-detail-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';
import { Wine } from 'src/app/interfaces/Interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  cart: Wine[] = [];
  total$: Observable<number> | undefined;

  constructor(
    private shopCartService: ShoppingCartService,
    private apiService: ApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.cart = shopCartService.getShopCartList();
  /*   this.total$ = shopCartService.shopcartTotal; */
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Aandacht!!', subtitle: 'Weet u zeker dat u ' + value.name + '?'}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const line = {id: value.id, name: value.name, qty: value.qty, price: value.pricesell};
          this.shopCartService.removeLineFromCart(line);
          this.cart = this.shopCartService.getShopCartList();
          this.total$ = this.shopCartService.shopcartTotal;
        }
      }
    );


  }

  clearShoppingCart(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Aandacht!!', subtitle: 'Weet u zeker dat u de winkelwagen wilt schoonmaken?'}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.cart = [];
          this.shopCartService.clearCart();
          this.total$ = this.shopCartService.shopcartTotal;
        }
      }
    );
  }

  openSnackBar(message: string ): void {
    console.log(message);
    const snackBarRef = this.snackBar.open(message, 'Shopping Cart', {
      duration: 3000
    });


  }


  ngOnInit(): void {
    this.total$ = this.shopCartService.shopcartTotal;
  }



}
