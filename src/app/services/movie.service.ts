import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private apiUrl = 'http://127.0.0.1:7854/api/movies';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl, { headers: this.headers });
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addMovie(movie: Movie): Observable<any> {
    return this.http.post<Movie>(this.apiUrl, movie, { headers: this.headers });
  }

  updateMovie(id: number, movie: Movie): Observable<any> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie, { headers: this.headers });
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
