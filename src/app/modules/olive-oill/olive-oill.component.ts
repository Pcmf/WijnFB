import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-olive-oill',
  templateUrl: './olive-oill.component.html',
  styleUrls: ['./olive-oill.component.scss']
})
export class OliveOillComponent implements OnInit {
  qty = 0;
  headerImage = '';
  constructor(
  ) { }

  ngOnInit(): void {
    this.headerImage = 'olival.jpg';
    window.scrollTo(0, 0);
  }

  addToCart(value: number): void{
  }

}
