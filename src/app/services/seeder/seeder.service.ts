import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SeederService {

  constructor() { }

  private apiUrl = 'https://api.themoviedb.org/3';
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTNjNTJkNTBkZTk0Y2Q0YWQ3OWM3MDdhYWZmZjU4YyIsInN1YiI6IjY1OWFiMTAwNGQwZThkMDA5NTQ5NjY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h6Sg-DaVFTQ1dMjSHrVPqkp7LiKA7sHacOqDndP7be0'
  }

  getTrendingMovies(page: number = 1) {
    return axios.get(`${this.apiUrl}/trending/movie/week?language=fr-FR&page=${page}`, {
      headers: this.headers
    })
  }

  getMovieCredits(movieId: number) {
    return axios.get(`${this.apiUrl}/movie/${movieId}/credits`, {
      headers: this.headers
    })
  }
}
