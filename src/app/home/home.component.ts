import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { AgeConfirmComponent } from '../components/age-confirm/age-confirm.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: string[] = ['douro1.jpg', 'wine_glasses.jpg', 'douro4.jpg'];
  headerImage = '';
  selectedLanguage: string | undefined;

  constructor(
    private languageService: LanguageService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    ) {
      this.languageService.selectedLanguage.subscribe(
        resp => this.selectedLanguage = resp
      );
    }

  ngOnInit(): void {
    if (!this.cookieService.check('under')){
        this.confirmAge();
    }
    const num = Math.floor(Math.random() * this.images.length);
    this.headerImage = this.images[num];
    window.scrollTo(0, 0);


  }

  confirmAge(): void{
    const dialogRef = this.dialog.open(AgeConfirmComponent, {
       disableClose: true, backdropClass: 'bdrop', width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => sessionStorage.setItem('permit', 'true')
    );
  }

}
