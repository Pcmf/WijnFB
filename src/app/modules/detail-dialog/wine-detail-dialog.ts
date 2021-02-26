import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShopcartLine } from 'src/app/interfaces/Interfaces';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'wine-detail-dialog',
    templateUrl: './wine-detail-dialog.html',
    styleUrls: ['./wine-detail-dialog.scss']
  })
  // tslint:disable-next-line:component-class-suffix
  export class WineDetailDialog {

    qty = 1;

    constructor(
      public dialogRef: MatDialogRef<WineDetailDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    addToCart(value: ShopcartLine): void{
      const obj = {id: this.data.id, name: this.data.name, qty: value.qty, price: this.data.pricesell};
      this.dialogRef.close(obj);
    }

  }
