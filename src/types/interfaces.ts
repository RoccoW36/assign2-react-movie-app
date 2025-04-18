
export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
}

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}

export type FilterOption = "title" | "genre";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface Review {
  author: string;
  content: string;
  agree: boolean;
  rating: number;
  movieId: number;
  tvShowId: number; 
}

export interface GenreData {
  genres: {
    id: string;
    name: string;
  }[];
}

export interface DiscoverMovies {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}

export interface Actor {
  id: number;
  name: string;
}

export interface BaseActorProps {
  id: number;
  name: string;
  profile_path?: string;
  popularity: number;
  known_for_department: string;
  gender?: number;
  favourite?: boolean;
  known_for?: {
    id: number;
    title?: string;
    name?: string;
    media_type?: string;
  }[];
}

export interface ActorDetailsProps extends BaseActorProps {
  biography: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  known_for: {
    id: number;
    title?: string;
    name?: string;
    media_type?: string;
  }[];
}

export interface ActorCardProps {
  actor: BaseActorProps;
  action: (a: BaseActorProps) => React.ReactNode;
}

export interface BaseActorListProps {
  actors: BaseActorProps[];
  action: (a: BaseActorProps) => React.ReactNode;
}

export interface ActorListPageTemplateProps extends BaseActorListProps {
  title: string;
}

export interface ActorPageProps {
  actor: ActorDetailsProps;
}

export type ActorFilterOption = "name";

export interface DiscoverActors {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseActorProps[];
}

export interface ActorImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface BaseTVShowProps {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline?: string;
  favourite?: boolean;
  genre_ids?: number[];
}

export interface BaseTVShowListProps {
  tvShows: BaseTVShowProps[];
  action: (tv: BaseTVShowProps) => React.ReactNode;
}

export interface TVShowDetailsProps extends BaseTVShowProps {
  genres: {
    id: number;
    name: string;
  }[];
  origin_country: string[];
  number_of_episodes: number;
  number_of_seasons: number;
  homepage?: string;
}

export interface TVShowImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface TVShowPageProps {
  tvShow: TVShowDetailsProps;
  images: TVShowImage[];
}

export type TVShowFilterOption = "name" | "genre";

export interface TVShowListPageTemplateProps extends BaseTVShowListProps {
  title: string;
}

export interface DiscoverTVShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTVShowProps[];
}
