import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ShopcartLine } from 'src/app/interfaces/Interfaces';
import { LanguageService } from 'src/app/services/language.service';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'wine-detail-dialog',
    templateUrl: './wine-detail-dialog.html',
    styleUrls: ['./wine-detail-dialog.scss']
  })
  // tslint:disable-next-line:component-class-suffix
  export class WineDetailDialog implements OnInit, OnDestroy{

    qty = 1;
    selectedLanguage: string | undefined;
    subscription: Subscription | undefined;
    constructor(
      public dialogRef: MatDialogRef<WineDetailDialog>,
      private languageService: LanguageService,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    addToCart(value: ShopcartLine): void{
      let text = '';
      if (this.selectedLanguage === 'NL') {
        text = ' is toegevoegd aan de boodschappenlijst!';
      } else if (this.selectedLanguage === 'PT') {
        text = ' foi adicionado ao carrinho';
      }
      const msg = this.data.name + text;
      const obj = {id: this.data.id, type: 1, name: msg, qty: value.qty, price: this.data.pricesell};
      this.dialogRef.close(obj);
    }

    ngOnInit(): void {
      this.subscription = this.languageService.selectedLanguage.subscribe(
        res => this.selectedLanguage = res
      );
    }
  
    ngOnDestroy(): void{
      this.subscription?.unsubscribe();
    }

  }
