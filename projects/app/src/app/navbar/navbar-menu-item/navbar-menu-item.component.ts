import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-menu-item',
  templateUrl: './navbar-menu-item.component.html',
})
export class NavbarMenuItemComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() routePath: string = '/';

  constructor() {}

  ngOnInit(): void {}
}
