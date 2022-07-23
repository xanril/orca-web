import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from '../models/movie.model';
import { AppState } from '../store';

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.component.html',
  styleUrls: ['./manage-movie.component.css']
})
export class ManageMovieComponent implements OnInit {
  movies: Movie[] = []

  constructor(private router:Router, 
    private activatedRoute:ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('movies').subscribe((data) => {
      this.movies = data.movies;
    });
  }

  onSearch() {
    this.router.navigate(['search'], {relativeTo:this.activatedRoute});
  }
}
