import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ApiDataService } from './../../services/api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { WineDetailDialog } from './../detail-dialog/wine-detail-dialog';
import { Subscription } from 'rxjs';
import { SelectMenuService } from './../../services/select-menu.service';
import { Selection, Wine } from './../../interfaces/Interfaces';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './../../services/language.service';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss']
})
export class WineListComponent implements OnInit {

  winesList: any = [];
  winesListSelection: any = [];
  subscription: Subscription | undefined;
  selection: Selection;
  favoritsList: string[] = [];
  selectedLanguage: string | undefined;

  constructor(
    private apiData: ApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private shoppCartService: ShoppingCartService,
    private selectionMenuService: SelectMenuService,
    private router: Router,
    private cookieService: CookieService,
    private languageService: LanguageService

  ) {

    this.selection = {winetype: 0, region: 0};
    this.getWineList(this.selection);
  }

  ngOnInit(): void {
    if ( this.cookieService.check('favorits')){
      this.favoritsList = JSON.parse(this.cookieService.get('favorits'));
    }
    this.subscription = this.selectionMenuService.menuSelection.subscribe(
      res => this.getWineList(res)
    );
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }

  getWineList(selection: Selection): void {
    if (!selection.region) {
      selection.region = 0;
    }
    if (!selection.winetype) {
      selection.winetype = 0;
    }
    this.apiData.getData('wines/filter/' + selection.winetype + '/' + selection.region ).subscribe(
      (resp: any[]) => {
        let msg = '';
        if (this.selectedLanguage === 'NL') {
          msg = 'Sorry, we hebben geen resultaten voor die zoekopdracht!';
        } else if (this.selectedLanguage === 'PT') {
          msg = 'Desculpe, não temos resultados para essa pesquisa!';
        }
        if ((!resp || resp.length === 0) && (selection.winetype !== 0 && selection.region !== 0)) {
          this.openSnackBar(msg, '');
        }
        this.winesListSelection = resp;
        this.winesListSelection.map((el: any) => {
          if (this.favoritsList?.indexOf(el.id) >= 0){
            el.favorit = true;
          }
        });

        }
    );
  }

  showDetail(wine: any): void{
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
          this.openSnackBar(result.name  + msg , 'Shopping Cart');
        }
      }
    );
  }


  openSnackBar(message: string, action: string ): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/shopcart']);
    } );
  }

  toggleToFavorits(event: any): void{
    const index = this.favoritsList.indexOf(event);
    if ( index >= 0 ) {
      this.favoritsList.splice(index, 1);
    } else {
      this.favoritsList.push(event);
    }
    this.cookieService.set('favorits', JSON.stringify(this.favoritsList), {expires: 30, path: '/', sameSite: 'Lax'});
  }

  OnDestroy(): void{
    this.cookieService.set('favorits', JSON.stringify(this.favoritsList));
    this.subscription?.unsubscribe();
  }

}

