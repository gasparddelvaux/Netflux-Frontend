import { Director } from "./director.interface";

export interface Movie {
  id: number;
  name: string;
  year: number;
  director_id: number;
  director: Director;
  synopsis: string;
  cover: string;
  created_at: Date;
  updated_at: Date;
};

