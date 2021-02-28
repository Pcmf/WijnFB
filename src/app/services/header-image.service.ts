import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderImageService {

  private Image = new BehaviorSubject('douro1.jpg');
  imageBackground = this.Image.asObservable();

  constructor() { }

  setImage(value: string): void{
    this.Image.next(value);
  }
}
