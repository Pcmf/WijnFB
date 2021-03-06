import { Component, OnInit } from '@angular/core';
import { HeaderImageService } from './../../services/header-image.service';
import { ApiDataService } from './../../services/api-data.service';

@Component({
  selector: 'app-likeuren',
  templateUrl: './likeuren.component.html',
  styleUrls: ['./likeuren.component.scss']
})
export class LikeurenComponent implements OnInit {
  qty = 0;
  products: any[] = [];
  constructor(
    private headerImageService: HeaderImageService,
    private apiDataService: ApiDataService
  ) {
      this.apiDataService.getData('products/3').subscribe(
        (resp: any[]) => this.products = resp
      );
   }

  ngOnInit(): void {
    this.headerImageService.setImage('licores1.jpg');
    window.scrollTo(0, 0);
  }

  addToCart(value: number): void{
  }

}
