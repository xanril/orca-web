import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesListPageComponent } from './movies-page/movies-page.component';
import { MoviesStartComponent } from './movies-start/movies-start.component';
import { MoviesSearchComponent } from './movies-search/movies-search.component';

const manageMovieRoutes: Routes = [
  {
    path: '',
    component: MoviesListPageComponent,
    children: [
      { path: 'search', component: MoviesSearchComponent },
      { path: 'detail/:movieId', component: MovieDetailComponent },
      { path: 'edit/:movieId', component: MoviesSearchComponent },
      { path: '', component: MoviesStartComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(manageMovieRoutes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
