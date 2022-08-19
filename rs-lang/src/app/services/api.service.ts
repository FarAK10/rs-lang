import { Injectable } from '@angular/core';
import { INewUser } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://app-rs-lang.herokuapp.com';

  post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(this.generateUrl(url), body);
  }

  generateUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }
}
