import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnInit {
  @Input() movieItem!: Movie;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onSelect() {
    this.router.navigate([this.movieItem.id + ''], {
      relativeTo: this.route,
    });
  }
}
