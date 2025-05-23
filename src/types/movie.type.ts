export interface MovieSummary {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}


export interface MovieSliceProps {
  searchedMovies: Partial<MovieSummary[]>
  movieDetail: Partial<MovieDetails>
  step: number
  apiError: boolean
}

export type KeyTypes = keyof MovieSliceProps

export type ValueType = MovieSliceProps[KeyTypes];
