import { Injectable, OnInit } from '@angular/core';
import { HardWords, ICurrentUser, INewUser, Level, Parameters, Word } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }


  baseUrl = 'https://app-rs-lang.herokuapp.com';
  // baseUrl = 'http://localhost:8088';

  post<T>(url: string, body: T): Observable<T> {
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

  getWords(group: string = '0', page: string = '0'): Observable<Object> {
    return this.http.get(`${this.baseUrl}/words?group=${group}&page=${page}`);
  }

  getWord(wordId: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/words/${wordId}`);
  }

  postHardWord(idUser: string, idWord: string) {
    return this.http.post(`${this.baseUrl}/users/${idUser}/words/${idWord}`, {
      "difficulty": "hard",
      "optional": {}
    });
  }

  removeHardWord(idUser: string, idWord: string) {
    return this.http.delete(`${this.baseUrl}/users/${idUser}/words/${idWord}`);
  }

  getHardWords(idUser: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/users/${idUser}/words`);
  }

  setSessionStorage(obj: Parameters): void {
    localStorage.setItem('parameters', JSON.stringify(obj));
  }

}
