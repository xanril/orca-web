import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-cinema',
  templateUrl: './manage-cinema.component.html'
})
export class ManageCinemaComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  addCinemaHandler(event: Event) {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
