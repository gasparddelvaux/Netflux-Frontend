import { Movie } from "./movie.interface";
import { User } from "./user.interface";

export interface MovieWithUser extends Movie {
  user: User;
}
