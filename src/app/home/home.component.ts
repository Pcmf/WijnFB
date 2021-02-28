import { Component, OnInit } from '@angular/core';
import { HeaderImageService } from './../services/header-image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private headerImageService: HeaderImageService
  ) { }

  ngOnInit(): void {
    this.headerImageService.setImage('douro1.jpg');
  }

}
