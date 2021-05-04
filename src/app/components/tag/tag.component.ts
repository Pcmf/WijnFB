import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: string | undefined;
  @Input() tagColor: string | undefined;
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.tagColor);
  }

}
