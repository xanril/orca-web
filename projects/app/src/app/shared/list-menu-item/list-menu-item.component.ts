import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-menu-item',
  templateUrl: './list-menu-item.component.html',
})
export class ListMenuItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string | null = null;
  @Input() itemId: number = -1;
  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  clickHandler() {
    this.onClick.emit(this.itemId);
  }

  deleteHandler() {
    this.onDelete.emit(this.itemId);
  }
}
