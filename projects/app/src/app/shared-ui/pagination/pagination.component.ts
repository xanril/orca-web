import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() maxCount: number = 3;
  @Input() currentPage: number = 2;
  @Input() windowCount: number = 1;

  isPreviousActive: boolean = false;
  isNextActive: boolean = true;
  displayedIndexes: { pageNumber: number, isActive: boolean}[] = [];

  constructor() { }

  ngOnInit(): void {

    this.isPreviousActive = this.currentPage > 0;
    this.isNextActive = this.currentPage < this.maxCount;

    let startingCount: number = Math.max(1, this.currentPage - this.windowCount);
    let endCount: number = Math.min(this.maxCount, this.currentPage + this.windowCount);

    console.log("start " + startingCount);
    console.log("end " + endCount);

    for (let index = 0; index <= endCount - startingCount; index++) {
      this.displayedIndexes[index] = {
        pageNumber: (startingCount + index),
        isActive: this.currentPage === (startingCount + index)
      }; 
    }
  }
}
