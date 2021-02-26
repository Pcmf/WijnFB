import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    // clear token and then logout
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  CloseSidenav(): void{
    this.sidenavClose.emit();
  }

}
