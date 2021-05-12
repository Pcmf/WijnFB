import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ApiDataService } from 'src/app/services/api-data.service';
@Component({
  selector: 'app-age-confirm',
  templateUrl: './age-confirm.component.html',
  styleUrls: ['./age-confirm.component.scss']
})
export class AgeConfirmComponent {
  checked =  false;
  selectedLanguage = 'NL';
  underAge: boolean | undefined;
  constructor(
    private cookieService: CookieService,
    private apiDataService: ApiDataService,
    public dialogRef: MatDialogRef<AgeConfirmComponent>
  ) { }

  onNoClick(): void {
    this.underAge = true;
  }

  toggle(): void{
    this.checked === false ?  this.checked = false : this.checked = true;
  }

  onClose(): void {
    if (this.checked === true) {
      this.cookieService.set('under', 'true', { expires: 30, path: '/', sameSite: 'Lax' });
    }
    this.apiDataService.changePermission(true);
    this.dialogRef.close('true');
  }

}
