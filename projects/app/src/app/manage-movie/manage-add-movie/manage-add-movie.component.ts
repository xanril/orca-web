import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';

@Component({
  selector: 'app-manage-add-movie',
  templateUrl: './manage-add-movie.component.html',
  styleUrls: ['./manage-add-movie.component.css'],
})
export class ManageAddMovieComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    tmdbId: new FormControl(null),
  });

  constructor() {}

  ngOnInit(): void {}

  onSearchMovie() {
    console.log(this.searchForm.valid);
  }
}
