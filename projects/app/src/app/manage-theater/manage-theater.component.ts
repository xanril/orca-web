import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-theater',
  templateUrl: './manage-theater.component.html',
  styleUrls: ['./manage-theater.component.css'],
})
export class ManageTheaterComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  addTheaterHandler(event: Event) {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
