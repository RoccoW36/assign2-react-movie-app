export interface BaseMovieProps {
  title: string;
  budget: number;
  homepage?: string;
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
  actors?: Actor[];
  image?: string | null;
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

export type FilterOption = "title" | "genre" | "name" | "department";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface Review {
  id: string;
  content: string;
  author: string;
  agree?: boolean;
  rating?: number;
  movieId: number;
}

export interface GenreData {
  genres: {
    id: number;
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
  biography?: string;
  birthday?: string;
  deathday?: string;
  place_of_birth?: string;
  popularity: number;
  profile_path?: string;
  known_for_department?: string; 
  gender?: number; 
  known_for?: Array<{ id: number; title?: string; name?: string; media_type?: string }>;
}


export interface ActorDetailsProps extends Actor {
  movie_credits: {
    cast: ActorMovieCredits[];
    crew: ActorMovieCredits[];
  };
  images?: ActorImage[];
}

export interface ActorMovieCredits {
  id: number;
  title: string;
  character?: string;
  poster_path?: string;
}

export interface ActorImage {
  file_path: string;
}

export interface BaseActorListProps { 
  actors: Actor[];
  action: (actor: Actor) => React.ReactNode;
}

export interface ActorListPageTemplateProps extends BaseActorListProps {
  title: string;
}

export interface DiscoverActors {
  page: number; 
  total_pages: number;
  total_results: number;
  results: Actor[];
}

export interface ActorsContextInterface {
  favourites: number[];
  addToFavourites: (actor: Actor) => void;
  removeFromFavourites: (actor: Actor) => void;
}
