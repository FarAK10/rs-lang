import { Injectable } from '@angular/core';
import { ICurrentUser, INewUser } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://app-rs-lang.herokuapp.com';
  // baseUrl = 'http://localhost:8088';

  post<T>(url: string, body: T): Observable<T> {
    console.log('post');
    return this.http.post<T>(this.generateUrl(url), body);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.generateUrl(url));
  }

  generateUrl(url: string): string {
    return `${this.baseUrl}/${url}`;
  }
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
