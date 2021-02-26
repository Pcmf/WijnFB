import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Selection } from './../interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class SelectMenuService {
  select: Selection = {winetype: 0, region:0 };

  private Selection = new BehaviorSubject(this.select);
  menuSelection = this.Selection.asObservable();

  constructor() { }

  menuSelectionChange(value: Selection): void{
    this.Selection.next(value);
  }
}
