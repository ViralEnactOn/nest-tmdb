import type { ColumnType } from 'kysely';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export interface Movie {
  adult: Generated<string | null>;
  backdrop_path: Generated<string | null>;
  budget: Generated<string | null>;
  created_at: Generated<Date>;
  external_ids: Generated<string | null>;
  genre_ids: Generated<string | null>;
  id: Generated<number | null>;
  imdb_id: Generated<string | null>;
  original_language: Generated<string | null>;
  original_title: Generated<string | null>;
  overview: Generated<string | null>;
  popularity: Generated<number | null>;
  poster_path: Generated<string | null>;
  poster_path_mobile: Generated<string | null>;
  production_countries: Generated<string | null>;
  release_date: Generated<string | null>;
  revenue: Generated<string | null>;
  runtime: Generated<number | null>;
  spoken_languages: Generated<string | null>;
  status: Generated<string | null>;
  title: Generated<string | null>;
  updated_at: Generated<Date>;
  video: Generated<string | null>;
  vote_average: Generated<number | null>;
  vote_count: Generated<string | null>;
}

export interface User {
  created_at: Generated<Date>;
  email: Generated<string | null>;
  id: Generated<number>;
  isVerified: Generated<number | null>;
  name: Generated<string | null>;
  password: Generated<string | null>;
  updated_at: Generated<Date>;
}

export interface UserComment {
  created_at: Generated<Date>;
  id: Generated<number>;
  movie_id: Generated<number | null>;
  parent_comment_id: Generated<number | null>;
  text: Generated<string | null>;
  updated_at: Generated<Date>;
  user_id: Generated<number | null>;
}

export interface UserFavoriteList {
  created_at: Generated<Date>;
  id: Generated<number>;
  items: Generated<string | null>;
  type: Generated<string | null>;
  updated_at: Generated<Date>;
  user_id: Generated<number | null>;
}

export interface UserWatchList {
  created_at: Generated<Date>;
  id: Generated<number>;
  isDeleted: Generated<number | null>;
  movies: Generated<string | null>;
  name: Generated<string | null>;
  updated_at: Generated<Date>;
  user_id: Generated<number | null>;
}

export interface DB {
  movie: Movie;
  user: User;
  user_comment: UserComment;
  user_favorite_list: UserFavoriteList;
  user_watch_list: UserWatchList;
}
