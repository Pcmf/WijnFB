import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit, OnDestroy {
  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;
  c = {
    name: '',
    email: '',
    msg: ''
  };

  constructor(
    private languageService: LanguageService,
    private apiData: ApiDataService
  ) { }

  ngOnInit(): void {
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }

  sendSuport(form: any): void{
    this.apiData.setData('contact', form).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp > 0) {
          this.c = {
            name: '',
            email: '',
            msg: ''
          };
          console.log('sucesso');
        }
      }
    );
  }

}
