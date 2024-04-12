import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../interfaces/movie.interface';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private apiUrl = 'http://127.0.0.1:7854/api/movies';
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  getMovies(currentPage: number, itemsPerPage: number, searchQuery: string) {
    return axios.get(this.apiUrl, {
      headers: this.headers,
      params: {
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        searchQuery: searchQuery
      }
    })
  }

  getMoviesAdmin(currentPage: number, itemsPerPage: number, searchQuery: string, userId?: number) {
    return axios.get('http://127.0.0.1:7854/api/admin/movies', {
      headers: this.headers,
      params: {
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        searchQuery: searchQuery,
        userId: userId
      }
    })
  }

  getMovie(id: number) {
    return axios.get(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addMovie(movie: Movie) {
    return axios.post(this.apiUrl, movie, { headers: this.headers });
  }

  updateMovie(movie: Movie) {
    return axios.put(`${this.apiUrl}/${movie.id}`, movie, { headers: this.headers });
  }

  deleteMovie(id: number) {
    return axios.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
