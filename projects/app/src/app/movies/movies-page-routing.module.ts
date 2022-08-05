import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesListPageComponent } from './movies-page/movies-page.component';
import { MoviesStartComponent } from './movies-start/movies-start.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';

const manageMovieRoutes: Routes = [
  { path: 'search', component: SearchMovieComponent },
  {
    path: '',
    component: MoviesListPageComponent,
    children: [
      { path: ':movieId', component: MovieDetailComponent },
      { path: 'edit/:movieId', component: SearchMovieComponent },
      { path: '', component: MoviesStartComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(manageMovieRoutes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
