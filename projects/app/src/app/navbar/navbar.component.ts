import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isMobileMenuShown: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showMobileMenuHandler(event: Event) {
    this.isMobileMenuShown = !this.isMobileMenuShown;
  }
}
