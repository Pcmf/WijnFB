import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../../services/shopping-cart.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();

  shopcartLoad = 0;
  subscription: Subscription | undefined;
  constructor(
    private router: Router,
    private shopcartService: ShoppingCartService
    ) { }

  ngOnInit(): void {
    this.subscription = this.shopcartService.shopcartLoad.subscribe(
      res => {
        this.shopcartLoad = res;
      }
    );
  }

  logout(): void {
    // clear token and then logout
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  CloseSidenav(): void{
    this.sidenavClose.emit();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
   }

}
