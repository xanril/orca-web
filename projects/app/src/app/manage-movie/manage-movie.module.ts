import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageAddMovieComponent } from './manage-add-movie/manage-add-movie.component';
import { ManageMovieComponent } from './manage-movie.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';

@NgModule({
  declarations: [ManageMovieComponent, ManageAddMovieComponent, SearchMovieComponent],
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ManageMovieComponent, ManageAddMovieComponent, SearchMovieComponent],
})
export class ManageMovieModule {}
