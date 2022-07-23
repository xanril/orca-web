import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTheaterComponent } from './manage-theater.component';

const manageTheaterRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ManageTheaterComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(manageTheaterRoutes)],
  exports: [RouterModule],
})
export class ManageTheaterRoutingModule {}
