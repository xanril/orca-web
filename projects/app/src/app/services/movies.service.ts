import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(environment.apiBaseUrl + '/movies');
  }

  addMovie(movie: Movie) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Movie>(environment.apiBaseUrl + '/movie', JSON.stringify(movie), {
      headers: headers,
    });
  }

  deleteMovie(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.delete<number>(environment.apiBaseUrl + '/movie/' + id).pipe(
      map((response) => {
        return id;
      })
    );
  }

  updateMovie(updatedMovie: Movie) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http
      .put<Movie>(
        environment.apiBaseUrl + '/movie/' + updatedMovie.id,
        JSON.stringify(updatedMovie),
        {
          headers: headers,
        }
      )
      .pipe(
        map((response) => {
          return updatedMovie;
        })
      );
  }
}
