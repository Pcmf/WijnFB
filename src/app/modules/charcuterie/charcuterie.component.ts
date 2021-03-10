import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charcuterie',
  templateUrl: './charcuterie.component.html',
  styleUrls: ['./charcuterie.component.scss']
})
export class CharcuterieComponent implements OnInit {

  qty = 0;
  headerImage = '';
  constructor( ) { }

  ngOnInit(): void {
    const num = Math.floor(Math.random() * 2) + 1;
    this.headerImage = 'charcuterie' + num + '.jpg';
    window.scrollTo(0, 0);
  }

  addToCart(value: number): void{
  }

}
