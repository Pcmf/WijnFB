import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  private ADDRESS = environment.ADDRESS;

  private Permited = new BehaviorSubject(false);
  isPermited = this.Permited.asObservable();

  constructor(
    private http: HttpClient,
  ) { }


  changePermission(value: boolean): void {
    console.log(value);
    this.Permited.next(value);
  }


  getData(param: string): any{
    return this.http.get( this.ADDRESS + param);
  }


  setData(param: string, obj: any): any{
    return this.http.put( this.ADDRESS + param , obj );
  }

}
