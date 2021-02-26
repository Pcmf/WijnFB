import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ApiDataService } from './../../services/api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { WineDetailDialog } from './../detail-dialog/wine-detail-dialog';
import { Subscription } from 'rxjs';
import { SelectMenuService } from './../../services/select-menu.service';
import { Selection } from './../../interfaces/Interfaces';
import { Router } from '@angular/router';

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

  constructor(
    private apiData: ApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private shoppCartService: ShoppingCartService,
    private selectionMenuService: SelectMenuService,
    private router: Router

  ) {
    this.selection = {winetype: 0, region: 0};
    this.getWineList(this.selection);
  }

  ngOnInit(): void {
    this.subscription = this.selectionMenuService.menuSelection.subscribe(
      res => this.getWineList(res)
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
        if ((!resp || resp.length==0) && (selection.winetype!=0 && selection.region!=0)) {
          this.openSnackBar('Sorry, we hebben geen resultaten voor die zoekopdracht!', '');
        }
        this.winesListSelection = resp;

        this.apiData.getData('wines/not/' + selection.winetype + '/' + selection.region).subscribe(
          (resp2: any[]) => {
            this.winesList = resp2;
          });
        }
    );
  }

  showDetail(wine: any): void{
    const dialogRef = this.dialog.open(WineDetailDialog, {
      data: wine
    });

    // add line to shopping cart
    dialogRef.afterClosed().subscribe(
      result => {
        if (result && result.qty > 0) {
          this.shoppCartService.addLineToCart(result);
          this.openSnackBar(result.name  + ' is toegevoegd aan de boodschappenlijst!', 'Shopping Cart');
        }
      }
    );
  }


  openSnackBar(message: string, action: string ): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 3000
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('Action go to shopp');
      this.router.navigate(['/shopcart']);
    } );
  }

}

