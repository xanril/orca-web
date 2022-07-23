import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() maxPage: number = 3;
  @Input() currentPage: number = 2;
  @Input() windowCount: number = 1;
  @Output() onPageItemClick: EventEmitter<number> = new EventEmitter<number>();

  isPreviousActive: boolean = false;
  isNextActive: boolean = true;
  displayedIndexes: { pageNumber: number; isActive: boolean }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initialize();
  }

  initialize() {
    this.isPreviousActive = this.currentPage > 0;
    this.isNextActive = this.currentPage < this.maxPage;

    let startingCount: number = Math.max(
      1,
      this.currentPage - this.windowCount
    );
    let endCount: number = Math.min(
      this.maxPage,
      this.currentPage + this.windowCount
    );
    
    for (let index = 0; index <= endCount - startingCount; index++) {
      this.displayedIndexes[index] = {
        pageNumber: startingCount + index,
        isActive: this.currentPage === startingCount + index,
      };
    }
  }

  onPreviousClick() {
    this.onPageItemClick.emit(this.currentPage - 1);
  }

  onNextClick() {
    this.onPageItemClick.emit(this.currentPage + 1);
  }

  onPageClick(pageNumber: number) {
    this.onPageItemClick.emit(pageNumber);
  }
}
