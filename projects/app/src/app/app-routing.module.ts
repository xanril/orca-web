import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.module').then(
        (m) => m.MoviesModule
      ),
  },
  {
    path: 'cinemas',
    loadChildren: () =>
      import('./cinemas/cinemas.module').then(
        (m) => m.CinemasModule
      ),
  },
  {
    path: 'schedules',
    loadChildren: () =>
      import('./schedules/schedules.module').then(
        (m) => m.SchedulesModule
      ),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRouting {}
