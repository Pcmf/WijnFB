import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiDataService } from './api-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private permission = false;
  constructor(
    private cookieService: CookieService,
    private apiDataService: ApiDataService
  ) { }


  canActivate(): any {
    if (this.cookieService.check('under') || sessionStorage.getItem('permit')) {
      return true;
    }
    return false;
  }


}
