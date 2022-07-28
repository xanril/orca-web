import { Component, Input, OnInit } from '@angular/core';
import { Cinema } from '../../models/cinema.model';

@Component({
  selector: 'app-cinema-item',
  templateUrl: './cinema-item.component.html'
})
export class CinemaItemComponent implements OnInit {
  @Input() cinemaItem!: Cinema;
  
  constructor() { }

  ngOnInit(): void {
  }

}
