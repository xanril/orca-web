import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemasPageComponent } from './cinemas-page.component';
import { EditCinemaComponent } from './edit-cinema/edit-cinema.component';

const cinemasPageRoutes: Routes = [
  { path: '', component: CinemasPageComponent },
  { path: 'edit/:id', component: EditCinemaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(cinemasPageRoutes)],
  exports: [RouterModule],
})
export class CinemasPageRoutingModule {}
