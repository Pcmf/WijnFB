import { Component, OnInit } from '@angular/core';
import { HeaderImageService } from 'src/app/services/header-image.service';

@Component({
  selector: 'app-bewaren',
  templateUrl: './bewaren.component.html',
  styleUrls: ['./bewaren.component.scss']
})
export class BewarenComponent implements OnInit {

  qty = 0;
  constructor(
    private headerImageService: HeaderImageService
  ) { }

  ngOnInit(): void {
    this.headerImageService.setImage('sardines1.jpg');
    window.scrollTo(0, 0);
  }

  addToCart(value: number): void{
  }
}
