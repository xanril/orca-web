import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchMovieResponse } from '../manage-movie/search-movie-result.model';
import { TMDBConfiguration } from '../manage-movie/tmdb-configuration.model';

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private apiKey: string = 'bdba455e0d926241736ae6ddc8ba3681';
  private configuration?: TMDBConfiguration;

  constructor(private httpClient: HttpClient) {
    this.getConfiguration();
  }

  getConfiguration() {
    let params: HttpParams = new HttpParams();
    params = params.append('api_key', this.apiKey);

    this.httpClient
      .get<TMDBConfiguration>(this.baseUrl + '/configuration', {
        params: params,
      })
      .subscribe((response: TMDBConfiguration) => {
        this.configuration = response;
      });
  }

  composePosterUrl(posterPath: string): string {
    const posterSize = this.configuration?.images?.poster_sizes?.[1];
    return (
      this.configuration?.images?.base_url + '/' + posterSize + '/' + posterPath
    );
  }

  searchMovies(movieTitle: string) {
    let params: HttpParams = new HttpParams();
    params = params.append('api_key', this.apiKey);
    params = params.append('query', movieTitle);

    return this.httpClient.get<SearchMovieResponse>(
      this.baseUrl + '/search/movie',
      {
        params: params,
      }
    );
  }
}
