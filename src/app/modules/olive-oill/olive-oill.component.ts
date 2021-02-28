import { Component, OnInit } from '@angular/core';
import { HeaderImageService } from 'src/app/services/header-image.service';

@Component({
  selector: 'app-olive-oill',
  templateUrl: './olive-oill.component.html',
  styleUrls: ['./olive-oill.component.scss']
})
export class OliveOillComponent implements OnInit {
  qty = 0;
  constructor(
    private headerImageService: HeaderImageService
  ) { }

  ngOnInit(): void {
    this.headerImageService.setImage('olival.jpg');
  }

  addToCart(value: number): void{
    
  }

}
