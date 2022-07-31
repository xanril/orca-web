import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-theme-toggle',
  templateUrl: './navbar-theme-toggle.component.html',
})
export class NavbarThemeToggleComponent implements OnInit {
  isToggledOn: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
