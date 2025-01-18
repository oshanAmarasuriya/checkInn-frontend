import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConfig } from '../url.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //private apiUrl = 'http://localhost:8080/api';
  private apiUrl=UrlConfig.apiUrl;
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { 
    this.tokenSubject.next(localStorage.getItem('token'));
  }

  get token(): Observable<string | null> {
    return this.tokenSubject.asObservable();
    
  }
  isAuthenticated(): boolean {
    // Check if a token exists and is not expired
    const token = this.tokenSubject.value;
    return !!token; // Add additional logic as needed
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/v1/auth/authenticate`;
    const credentials = { "userName":username, "password":password };
    return this.http.post<any>(url,credentials)
    .pipe(
      tap(response => {
        const { token } = response;
        localStorage.setItem('token', token);
        this.tokenSubject.next(token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    
  }
  sendNewAgent(newCredentials: any): Observable<any> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.apiUrl}/v1/auth/register`;
    return this.http.post<any>(url, newCredentials);
  }
}
