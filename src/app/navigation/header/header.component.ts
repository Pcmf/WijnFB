import { Component, OnDestroy, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  subscription: Subscription | undefined;
  shownav = false;
  shopcartLoad = 0;

  constructor(
    private apiService: ApiDataService,
    private shopcartService: ShoppingCartService
  ) {   }

  ngOnInit(): void {
    this.subscription = this.apiService.isLoged.subscribe(
      res => {
        this.shownav = res;
      }
    );
    this.subscription = this.shopcartService.shopcartLoad.subscribe(
      res => {
        this.shopcartLoad = res;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
   }

   ToggleSidenav(): void {
     this.sidenavToggle.emit();
   }

}
