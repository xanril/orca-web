import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
  {
    path: 'movies', loadChildren: () => import('./manage-movie/manage-movie.module').then(m => m.ManageMovieModule)
  },
  {
    path: 'theaters', loadChildren: () => import('./manage-theater/manage-theater.module').then(m => m.ManageTheaterModule)
  },
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
