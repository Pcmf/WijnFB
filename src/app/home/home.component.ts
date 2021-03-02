import { Component, OnInit } from '@angular/core';
import { HeaderImageService } from './../services/header-image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: string[] = ['douro1.jpg', 'wine_glasses.jpg', 'douro4.jpg'];

  constructor(
    private headerImageService: HeaderImageService
  ) { }

  ngOnInit(): void {
    const num = Math.floor(Math.random() * this.images.length);
    this.headerImageService.setImage(this.images[num]);
  }

}
