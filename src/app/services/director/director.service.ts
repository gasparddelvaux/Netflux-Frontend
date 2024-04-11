import { Injectable } from '@angular/core';
import axios from 'axios';
import { Director } from '../../interfaces/director.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private apiUrl = 'http://127.0.0.1:7854/api/directors';
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  constructor() { }

  getDirectors(currentPage: number, itemsPerPage: number, searchQuery: string) {
    return axios.get(this.apiUrl, {
      headers: this.headers,
      params: {
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        searchQuery: searchQuery
      }
    })
  }

  listDirectors() {
    return axios.get(this.apiUrl + '-list', {
      headers: this.headers
    });
  }

  addDirector(director: Director) {
    return axios.post(this.apiUrl, director, {
      headers: this.headers
    });
  }

  updateDirector(id: number, director: Director) {
    return axios.put(this.apiUrl + '/' + id, director, {
      headers: this.headers
    });
  }

  deleteDirector(id: number) {
    return axios.delete(this.apiUrl + '/' + id, {
      headers: this.headers
    });
  }
}
