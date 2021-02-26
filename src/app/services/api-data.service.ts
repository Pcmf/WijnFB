import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  private ADDRESS = environment.ADDRESS;
  
  private Loged = new BehaviorSubject(false);
  isLoged = this.Loged.asObservable();

  constructor(
    private http: HttpClient
  ) { }


  changeLogged(value: boolean): void {
    this.Loged.next(value);
  }


  getData(param: string): any{
    return this.http.get( this.ADDRESS + param);
  }




}
