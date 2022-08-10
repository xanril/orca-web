import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaDetailComponent } from './cinema-detail/cinema-detail.component';
import { CinemasPageComponent } from './cinemas-page/cinemas-page.component';
import { CinemasStartComponent } from './cinemas-start/cinemas-start.component';

const cinemasRoutes: Routes = [
  {
    path: '',
    component: CinemasPageComponent,
    children: [
      { path: 'detail/:cinemaId', component: CinemaDetailComponent },
      { path: '', component: CinemasStartComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cinemasRoutes)],
  exports: [RouterModule],
})
export class CinemasPageRoutingModule {}
