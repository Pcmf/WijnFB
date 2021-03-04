import { Component, OnInit } from '@angular/core';
import { HeaderImageService } from 'src/app/services/header-image.service';

@Component({
  selector: 'app-charcuterie',
  templateUrl: './charcuterie.component.html',
  styleUrls: ['./charcuterie.component.scss']
})
export class CharcuterieComponent implements OnInit {

  qty = 0;
  constructor(
    private headerImageService: HeaderImageService
  ) { }

  ngOnInit(): void {
    const num = Math.floor(Math.random() * 2) + 1;
    console.log(num);
    this.headerImageService.setImage('charcuterie' + num + '.jpg');
    window.scrollTo(0, 0);
  }

  addToCart(value: number): void{
  }

}
