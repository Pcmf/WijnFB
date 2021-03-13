import { Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { ShopcartLine } from './../interfaces/Interfaces';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private Shopcart = new BehaviorSubject(0);
  shopcartLoad = this.Shopcart.asObservable();

  private ShopcartTotal = new BehaviorSubject(0);
  shopcartTotal = this.ShopcartTotal.asObservable();

  cart: ShopcartLine[] = [];
  found = false;

  constructor(
    private apiService: ApiDataService,
    private cookieService: CookieService
  ) { }



  addLineToCart(line: ShopcartLine): void {
    if (this.cart.length > 0) {
      this.found = false;
      this.cart.forEach((el: ShopcartLine) => {
        if (el.id === line.id) {
          el.qty += line.qty;
          this.found = true;
        }
      });
      if (!this.found) {
        this.cart.push(line);
      }
    } else {
      this.cart.push(line);
    }
    this.getShopCartTotalValue();
    this.saveShopcartToCookies();
  }

  updateCartQty(line: any): void {
    this.cart.forEach((el: any) => {
      if (el.id === line.id) {
        el.qty = line.qty;
      }
    });
    this.getShopCartTotalValue();
    this.saveShopcartToCookies();
  }

  clearCart(): void {
    this.cart = [];
    this.Shopcart.next(0);
    this.cookieService.delete('shopcart');
  }

  removeLineFromCart(line: ShopcartLine): void {
    this.cart = this.cart.filter((el: ShopcartLine) => {
      return el.id != line.id;
    });
    this.getShopCartTotalValue();
    this.saveShopcartToCookies();
  }

  getShopCartList(): any[] {
    const wines: any[] = [];

    this.cart.forEach((element: { id: number; type: number; qty: number; }) => {
      if (element.type == 1) {
        this.apiService.getData('wines/' + element.id).subscribe(
          (res: any) => {
            res[0].qty = element.qty;
            wines.push(res[0]);
          }
        );
      } else {
        this.apiService.getData('products/' + element.type + '/' + element.id).subscribe(
          (res: any) => {
            res[0].qty = element.qty;
            wines.push(res[0]);
          }
        );
      }

    });

    return wines;
  }

  getShopCartTotalValue(): number {
    const total = this.cart.reduce((acc: number, el: ShopcartLine) => {
      return +acc + el.price * el.qty;
    }, 0);
    const totalItems = this.cart.reduce((acc: number, el: ShopcartLine) => {
      return +acc + el.qty;
    }, 0);
    this.ShopcartTotal.next(total);
    this.Shopcart.next(totalItems);
    return total;
  }

  getShopcartFromCookies(): void {
    if (this.cookieService.check('shopcart')) {
      this.cart = JSON.parse(this.cookieService.get('shopcart'));
      this.getShopCartTotalValue();
    }
  }

  saveShopcartToCookies(): void {
    this.cookieService.set('shopcart', JSON.stringify(this.cart), { expires: 30, path: '/', sameSite: 'Lax' });
  }


}
