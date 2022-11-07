import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  headerImage = '';
  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.headerImage = 'douro1.jpg';
    this.subscription = this.languageService.selectedLanguage.subscribe(
      res => this.selectedLanguage = res
    );
    window.scrollTo(0, 0);
  }

}
