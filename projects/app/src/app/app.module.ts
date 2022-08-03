import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NavbarModule } from './navbar/navbar.module';
import { AppRouting } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { CinemaEffects } from './store/cinemas/cinema.effects';

@NgModule({
  declarations: [AppComponent, HomePageComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([CinemaEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AppRouting,
    NavbarModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}