import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-other-products-teaser',
  templateUrl: './other-products-teaser.component.html',
  styleUrls: ['./other-products-teaser.component.scss']
})
export class OtherProductsTeaserComponent implements OnInit, OnDestroy {

  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
  }

  ngOnDestroy(): void{
    this.subscription?.unsubscribe();
  }


}
