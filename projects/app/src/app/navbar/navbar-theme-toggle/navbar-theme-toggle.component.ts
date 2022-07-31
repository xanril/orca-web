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
      localStorage.setItem('gala-theme', this.activeTheme);
      this.isToggledOn = true;
      this.setTheme('light');
      return;
    }

    this.isToggledOn = storedTheme === 'light';
    this.setTheme(storedTheme);
  }

  toggleHandler(event: Event) {
    const checkbox = event.currentTarget as HTMLInputElement;
    this.isToggledOn = checkbox.checked;
    this.setTheme(this.isToggledOn ? 'light' : 'dark');
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
