import { Component, OnDestroy, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { HeaderImageService } from './../../services/header-image.service';

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
  backgroundImage: string | undefined;
  constructor(
    private apiService: ApiDataService,
    private shopcartService: ShoppingCartService,
    private headerImageService: HeaderImageService
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
    this.subscription = this.headerImageService.imageBackground.subscribe(
      img => this.backgroundImage = img
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
   }

   ToggleSidenav(): void {
     this.sidenavToggle.emit();
   }

}
