import { Movie } from "./movie.interface";
import { User } from "./user.interface";

export interface UserWithMovie extends User {
  movies: Movie[];
}
