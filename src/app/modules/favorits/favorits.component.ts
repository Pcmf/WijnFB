import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiDataService } from 'src/app/services/api-data.service';
import { Wine } from 'src/app/interfaces/Interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WineDetailDialog } from '../detail-dialog/wine-detail-dialog';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorits.component.html',
  styleUrls: ['./favorits.component.scss']
})
export class FavoritsComponent implements OnInit {
  subscription: Subscription | undefined;
  wines: Wine[] |undefined;
  favorites: Wine[] | undefined;
  favoritesWines: Wine[]  = [];
  selectedLanguage: string | undefined;
  favoritsList: string[] = [];
  headerImage = '';
  

  constructor(
    private cookieService: CookieService,
    private apiDataService: ApiDataService,
    public dialog: MatDialog,
    private shoppCartService: ShoppingCartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private languageService: LanguageService
  ) {
    this.favoritsList = this.getFavoritesFromCookies();

    if (this.favoritsList.length > 0){
    this.favoritsList.forEach((element) => {
        this.apiDataService.getData('wines/' + element).subscribe(
          (res: any) => {
            res[0].favorit = true;
            this.favoritesWines.push(res[0]);
          }
        );
    });
    }
  }

  ngOnInit(): void {
    this.headerImage = 'salut.jpg';
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }



  getFavoritesFromCookies(): any[] {
    if (this.cookieService.check('favorits')) {
      const favorits = this.cookieService.get('favorits');
      if (favorits.length>0){
        return JSON.parse(this.cookieService.get('favorits'));
      }
      return [];
    }
    return [];
  }

  showDetail(wine: any): void {
    console.log(wine);
    const dialogRef = this.dialog.open(WineDetailDialog, {
      data: wine,
      maxWidth: '92vw'
    });

    // add line to shopping cart
    dialogRef.afterClosed().subscribe(
      result => {
        let msg = '';
        if (this.selectedLanguage === 'NL') {
          msg = ' is toegevoegd aan de boodschappenlijst!';
        } else if (this.selectedLanguage === 'PT') {
          msg = ' foi adicionado à lista de compras!';
        }
        if (result?.qty > 0) {
          this.shoppCartService.addLineToCart(result);
          this.openSnackBar(result.name + msg, 'Shopping Cart');
        }
      }
    );
  }

  openSnackBar(message: string, action: string): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/shopcart']);
    });
  }

  toggleToFavorits(event: any): void {
    const index = this.favoritsList.indexOf(event);
    if (index >=0 ){
      this.favoritsList.splice(index, 1);
    } else {
      this.favoritsList.push(event);
    }

    if (this.favoritsList.length === 0){
      this.cookieService.set('favorits', '', { expires: 1, path: '/', sameSite: 'Lax' });
      this.cookieService.delete('favorits');
    } else {
      this.cookieService.set('favorits', JSON.stringify(this.favoritsList), { expires: 30, path: '/', sameSite: 'Lax' });
    }
  }

  OnDestroy(): void {
    this.cookieService.set('favorits', JSON.stringify(this.favoritsList));
    this.subscription?.unsubscribe();
  }



}
