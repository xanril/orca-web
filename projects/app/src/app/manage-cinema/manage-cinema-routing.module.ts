import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';
import { ManageCinemaComponent } from './manage-cinema.component';

const manageCinemaRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'add', component: AddCinemaComponent },
      { path: '', component: ManageCinemaComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(manageCinemaRoutes)],
  exports: [RouterModule],
})
export class ManageCinemaRoutingModule {}
