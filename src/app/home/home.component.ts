import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: string[] = ['douro1.jpg', 'wine_glasses.jpg', 'douro4.jpg'];
  headerImage = '';

  constructor() { }

  ngOnInit(): void {
    const num = Math.floor(Math.random() * this.images.length);
    this.headerImage = this.images[num];
    window.scrollTo(0, 0);
  }

}
