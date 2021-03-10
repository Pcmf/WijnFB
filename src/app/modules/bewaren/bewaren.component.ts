import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bewaren',
  templateUrl: './bewaren.component.html',
  styleUrls: ['./bewaren.component.scss']
})
export class BewarenComponent implements OnInit {

  qty = 0;
  headerImage = '';
  constructor( ) { }

  ngOnInit(): void {
    this.headerImage = 'sardines1.jpg';
    window.scrollTo(0, 0);
  }

  addToCart(value: number): void{
  }
}
