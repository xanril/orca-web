import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ListMenuItemComponent } from './list-menu-item/list-menu-item.component';

@NgModule({
  declarations: [
    PaginationComponent,
    ListMenuItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    ListMenuItemComponent
  ]
})
export class SharedModule { }
