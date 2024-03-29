import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { NavbarThemeToggleComponent } from './navbar-theme-toggle/navbar-theme-toggle.component';

@NgModule({
  declarations: [NavbarComponent, NavbarThemeToggleComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarModule {}
