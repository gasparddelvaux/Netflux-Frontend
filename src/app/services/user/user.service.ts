import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://127.0.0.1:7854/api/users';
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
}
