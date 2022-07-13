import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SearchMovieResponse } from '../models/search-movie-result.model';
import { TMDBConfiguration } from '../models/tmdb-configuration.model';
import { TMDBMovieDetails } from '../models/tmdb-movie-details.model';

@Injectable({ providedIn: 'root' })
export class TMDBService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private configuration?: TMDBConfiguration = mockConfiguration;

  constructor(private httpClient: HttpClient) {
    this.getConfiguration();
  }

  getConfiguration() {
    let params: HttpParams = new HttpParams();
    params = params.append('api_key', environment.tmdbApiKey);

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
    return this.configuration?.images?.base_url! + posterSize + posterPath;
  }

  composeBackdropUrl(backdropPath: string): string {
    const imageSize = 'w1280';
    return this.configuration?.images?.base_url! + imageSize + backdropPath;
  }

  searchMovie(movieTitle: string) {
    let params: HttpParams = new HttpParams();
    params = params.append('api_key', environment.tmdbApiKey);
    params = params.append('query', movieTitle);

    return this.httpClient.get<SearchMovieResponse>(
      this.baseUrl + '/search/movie',
      {
        params: params,
      }
    );
  }

  getMovieDetails(tmdbMovieId: number) {
    let params: HttpParams = new HttpParams();
    params = params.append('api_key', environment.tmdbApiKey);

    return this.httpClient.get<TMDBMovieDetails>(
      this.baseUrl + '/movie/' + tmdbMovieId,
      {
        params: params,
      }
    );
  }
}

const mockConfiguration: TMDBConfiguration = {
  images: {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
    logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
    poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profile_sizes: ['w45', 'w185', 'h632', 'original'],
    still_sizes: ['w92', 'w185', 'w300', 'original'],
  },
  change_keys: [
    'adult',
    'air_date',
    'also_known_as',
    'alternative_titles',
    'biography',
    'birthday',
    'budget',
    'cast',
    'certifications',
    'character_names',
    'created_by',
    'crew',
    'deathday',
    'episode',
    'episode_number',
    'episode_run_time',
    'freebase_id',
    'freebase_mid',
    'general',
    'genres',
    'guest_stars',
    'homepage',
    'images',
    'imdb_id',
    'languages',
    'name',
    'network',
    'origin_country',
    'original_name',
    'original_title',
    'overview',
    'parts',
    'place_of_birth',
    'plot_keywords',
    'production_code',
    'production_companies',
    'production_countries',
    'releases',
    'revenue',
    'runtime',
    'season',
    'season_number',
    'season_regular',
    'spoken_languages',
    'status',
    'tagline',
    'title',
    'translations',
    'tvdb_id',
    'tvrage_id',
    'type',
    'video',
    'videos',
  ],
};
