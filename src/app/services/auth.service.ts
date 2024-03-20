import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

interface verifyTokenResponse {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<verifyTokenResponse>('http://127.0.0.1:7854/api/verifyToken', null, httpOptions).pipe(
      map((response) => {
        if(response.type == 'success') {
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>('http://127.0.0.1:7854/api/login', {email, password});
  }

  register (name: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post<User>('http://127.0.0.1:7854/api/register', {name, email, password, password_confirmation});
  }
}
