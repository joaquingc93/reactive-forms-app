import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicPageComponent } from "./reactive/pages/basic-page.component/basic-page.component";
import { CountryPageComponent } from "./country/pages/country-page.component/country-page.component";
import { DynamicPageComponent } from "./reactive/pages/dynamic-page.component/dynamic-page.component";
import { RegisterPageComponent } from "./auth/pages/register-page.component/register-page.component";
import { SwitchesPagesComponent } from "./reactive/pages/switches-pages.component/switches-pages.component";
import { SideMenuComponent } from "./shared/components/side-menu/side-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  SideMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('reactive-forms-app');
}
