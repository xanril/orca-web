import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListPageComponent } from './movies-page/movies-page.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';

const manageMovieRoutes: Routes = [
  { path: 'search', component: SearchMovieComponent },
  { path: '', component: MoviesListPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(manageMovieRoutes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
