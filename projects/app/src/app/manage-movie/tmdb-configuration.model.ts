export interface TMDBConfiguration {
  images?: TMDBImagesConfiguration;
  change_keys?: string[];
}

export interface TMDBImagesConfiguration {
  base_url?: string;
  secure_base_url?: string;
  backdrop_sizes?: string[];
  logo_sizes?: string[];
  poster_sizes?: string[];
  profile_sizes?: string[];
  still_sizes?: string[];
}
