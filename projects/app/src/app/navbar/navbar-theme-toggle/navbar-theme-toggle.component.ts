import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-theme-toggle',
  templateUrl: './navbar-theme-toggle.component.html',
})
export class NavbarThemeToggleComponent implements OnInit {
  isToggledOn: boolean = true;
  activeTheme: string = 'light';

  constructor() {}

  ngOnInit(): void {
    const storedTheme = localStorage.getItem('gala-theme');
    
    if (!storedTheme) {
      // no stored theme found, 
      // so we save the default theme to light
      this.isToggledOn = true;
      this.setTheme(this.activeTheme);
      return;
    }

    this.isToggledOn = storedTheme === 'light';
    this.setTheme(this.isToggledOn ? 'light' : 'dark');
  }

  // check
  toggleHandler(event: Event) {
    const checkbox = event.currentTarget as HTMLInputElement;
    this.isToggledOn = checkbox.checked;
    this.setTheme(this.isToggledOn ? 'light' : 'dark');
  }

  setTheme(theme: string) {
    this.activeTheme = theme;
    localStorage.setItem('gala-theme', this.activeTheme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
