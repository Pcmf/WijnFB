import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo-price',
  templateUrl: './promo-price.component.html',
  styleUrls: ['./promo-price.component.scss']
})
export class PromoPriceComponent implements OnInit {
  @Input() promoPrice: number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
