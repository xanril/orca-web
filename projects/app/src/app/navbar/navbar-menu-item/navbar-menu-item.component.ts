import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-menu-item',
  templateUrl: './navbar-menu-item.component.html',
  styleUrls: ['./navbar-menu-item.component.css']
})
export class NavbarMenuItemComponent implements OnInit {
  @Input() isActive: boolean = false;
  @Input() routePath: string = "/";

  constructor() { }

  ngOnInit(): void {
  }

}
