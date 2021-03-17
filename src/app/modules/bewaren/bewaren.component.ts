import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-bewaren',
  templateUrl: './bewaren.component.html',
  styleUrls: ['./bewaren.component.scss']
})
export class BewarenComponent implements OnInit {
  qty = 1;
  headerImage = '';
  products: any[] = [];

  constructor(
    private apiDataService: ApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private shopCartService: ShoppingCartService
  ) {
      this.apiDataService.getData('products/4').subscribe(
        (resp: any[]) => this.products = resp
      );
   }

  ngOnInit(): void {
    this.headerImage = 'sardines1.jpg';
    window.scrollTo(0, 0);
  }

  addToCart(qt: any, product: any): void{
    const msg = product.name + ' is toegevoegd aan de boodschappenlijst!';
    this.openSnackBar(msg, 'Shoping Cart');
    this.shopCartService.addLineToCart({id: product.id, type: product.type, name: product.name, qty: qt.qty, price: product.pricesell});
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