import { Component, OnInit } from '@angular/core';
import { HeaderImageService } from './../../services/header-image.service';

@Component({
  selector: 'app-likeuren',
  templateUrl: './likeuren.component.html',
  styleUrls: ['./likeuren.component.scss']
})
export class LikeurenComponent implements OnInit {
  qty = 0;
  constructor(
    private headerImageService: HeaderImageService
  ) { }

  ngOnInit(): void {
    this.headerImageService.setImage('olival.jpg');
    window.scrollTo(0, 0);
  }

  addToCart(value: number): void{
  }

}
