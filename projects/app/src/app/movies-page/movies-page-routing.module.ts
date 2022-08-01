import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesPageComponent } from './movies-page.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';

const manageMovieRoutes: Routes = [
  { path: 'search', component: SearchMovieComponent },
  { path: '', component: MoviesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(manageMovieRoutes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
