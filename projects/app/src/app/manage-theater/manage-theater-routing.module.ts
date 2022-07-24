import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTheaterComponent } from './add-theater/add-theater.component';
import { ManageTheaterComponent } from './manage-theater.component';

const manageTheaterRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'add', component: AddTheaterComponent },
      { path: '', component: ManageTheaterComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(manageTheaterRoutes)],
  exports: [RouterModule],
})
export class ManageTheaterRoutingModule {}
