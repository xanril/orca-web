import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cinema } from '../../models/cinema.model';

@Component({
  selector: 'app-cinema-item',
  templateUrl: './cinema-item.component.html',
})
export class CinemaItemComponent implements OnInit {
  @Input() cinemaItem!: Cinema;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  manageHandler() {
    this.router.navigate(['edit', this.cinemaItem.id + ''], {
      relativeTo: this.activatedRoute,
    });
  }
}
