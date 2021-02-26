import { Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { ShopcartLine } from './../interfaces/Interfaces';
import { BehaviorSubject } from 'rxjs';

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
    private apiService: ApiDataService
  ) { }

  addLineToCart(line: ShopcartLine): void{
    if (this.cart.length > 0) {
      this.found = false;
      this.cart.forEach( (el: ShopcartLine) => {
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
  }

  updateCartQty(line: any): void{
      this.cart.forEach( (el: any) => {
        if (el.id === line.id) {
          el.qty = line.qty;
        }
      });
      this.getShopCartTotalValue();
  }

  clearCart(): void {
    this.cart = [];
  }

  removeLineFromCart(line: ShopcartLine): void{
    console.table(this.cart);
    console.table(line);
    this.cart = this.cart.filter((el: ShopcartLine) => {
      return el.id != line.id;
    });
    this.getShopCartTotalValue();
  }

  getShopCartList(): any[]{
    const wines: any[] = [];

    this.cart.forEach((element: { id: number; qty: number; }) => {
      this.apiService.getData('wines/' + element.id).subscribe(
        (res: any) => {
          res[0].qty = element.qty;
          wines.push(res[0]);
        }
      );
    });
    return wines;
  }

  getShopCartTotalValue(): number{
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
}
