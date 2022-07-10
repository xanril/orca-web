import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchMovieResponse } from '../manage-movie/search-movie-result.model';

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) {}

  searchMovies(movieTitle: string) {
    let params: HttpParams = new HttpParams();
    params = params.append('api_key', 'bdba455e0d926241736ae6ddc8ba3681');
    params = params.append('query', movieTitle);

    return this.httpClient.get<SearchMovieResponse>(this.baseUrl + '/search/movie', {
      params: params,
    });
  }
}
