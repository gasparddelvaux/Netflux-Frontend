import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import axios from 'axios';

interface verifyTokenResponse {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  verifyToken() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return axios.post('http://127.0.0.1:7854/api/verifyToken', {}, { headers: headers });
  }

  login(email: string, password: string) {
    return axios.post('http://127.0.0.1:7854/api/login', {
      email,
      password,
    });
  }

  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return axios.post('http://127.0.0.1:7854/api/register', {
      name,
      email,
      password,
      password_confirmation,
    });
  }
}
