import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/cinemas',
    pathMatch: 'full',
  },
  {
    path: 'movies', loadChildren: () => import('./manage-movie/manage-movie.module').then(m => m.ManageMovieModule)
  },
  {
    path: 'cinemas', loadChildren: () => import('./cinemas-page/cinemas-page.module').then(m => m.CinemasPageModule)
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
