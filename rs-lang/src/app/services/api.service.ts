import { Injectable } from '@angular/core';
import { ICurrentUser, INewUser } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }
  // baseUrl = 'https://app-rs-lang.herokuapp.com';
  baseUrl = 'http://localhost:8088';

  post<T>(url: string, body: T): Observable<T> {
    console.log('post');
    return this.http.post<T>(this.generateUrl(url), body);
  }

  generateUrl(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  getWords(group?: string, page?: string) {
    return this.http.get(`${this.baseUrl}?page=${page}&group=${group}`);
  }

}
