export interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  tagline: string;
  overview: string;
  runtime: number;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: Date;
}
