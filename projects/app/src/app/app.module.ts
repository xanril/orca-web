import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ManageMovieComponent } from './manage-movie/manage-movie.component';
import { ManageAddMovieComponent } from './manage-movie/manage-add-movie/manage-add-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageMovieComponent,
    ManageAddMovieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
