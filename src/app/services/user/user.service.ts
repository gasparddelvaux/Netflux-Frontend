import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://127.0.0.1:7854/api';
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  constructor() { }

  getInfo() {
    return axios.get('http://127.0.0.1:7854/api/user-info', {
      headers: this.headers,
    });
  }

  getInfoAdmin(id: number) {
    return axios.get('http://127.0.0.1:7854/api/admin/userInfo/' + id, {
      headers: this.headers,
    });
  }

  getUsers(currentPage: number, itemsPerPage: number, searchQuery: string) {
    return axios.get(this.apiUrl + '/admin/users', {
      headers: this.headers,
      params: {
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        searchQuery: searchQuery
      }
    });
  }

  updateUser(user: User) {
    return axios.put(this.apiUrl + '/admin/users/' + user.id, user, {
      headers: this.headers
    });
  }
}
