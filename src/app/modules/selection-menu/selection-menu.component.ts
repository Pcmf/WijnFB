import { Component, OnInit } from '@angular/core';
import { Selection } from './../../interfaces/Interfaces';
import { SelectMenuService } from './../../services/select-menu.service';



@Component({
  selector: 'app-selection-menu',
  templateUrl: './selection-menu.component.html',
  styleUrls: ['./selection-menu.component.scss']
})
export class SelectionMenuComponent implements OnInit {

  constructor(
    private selectMenu: SelectMenuService
  ) { }

  ngOnInit(): void {
  }

  winetypeChanged(selection: Selection): void {
    console.log(selection);
    if (selection.winetype == 8) {
      selection.region = 10;
    }
    if (selection.winetype == 7) {
      selection.region = 0;
    }
    this.selectMenu.menuSelectionChange(selection);
  }

}
