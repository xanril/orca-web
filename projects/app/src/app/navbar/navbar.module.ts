import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarMenuItemComponent } from './navbar-menu-item/navbar-menu-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, NavbarMenuItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarModule {}
