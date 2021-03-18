import { Component, OnInit, OnDestroy } from '@angular/core';
import { Selection } from './../../interfaces/Interfaces';
import { SelectMenuService } from './../../services/select-menu.service';
import { LanguageService } from './../../services/language.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-selection-menu',
  templateUrl: './selection-menu.component.html',
  styleUrls: ['./selection-menu.component.scss']
})
export class SelectionMenuComponent implements OnInit, OnDestroy {

  selectedLanguage: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private selectMenu: SelectMenuService,
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

  winetypeChanged(selection: Selection): void {
    console.log(selection);
    if (selection.winetype === 8) {
      selection.region = 10;
    }
    if (selection.winetype === 7) {
      selection.region = 0;
    }
    this.selectMenu.menuSelectionChange(selection);
  }

}
