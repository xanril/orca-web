import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ManageMovieComponent } from './manage-movie/manage-movie.component';
import { ManageAddMovieComponent } from './manage-movie/manage-add-movie/manage-add-movie.component';
import { ManageMovieModule } from './manage-movie/manage-movie.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ManageMovieModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
