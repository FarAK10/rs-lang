import { Injectable } from '@angular/core';
import { HardWords, IUserStatista, Parameters } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private dataService: DataService) {}

  baseUrl = 'https://app-rs-lang.herokuapp.com';
  // baseUrl = 'http://localhost:8088';

  post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(this.generateUrl(url), body);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.generateUrl(url));
  }

  put<T>(url: string, body: T): Observable<T> {
    return this.http.put<T>(this.generateUrl(url), body);
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

  postWord(idUser: string, idWord: string, opt: string): Observable<HardWords> {
    let optionalBody = {
      isLearned: false,
    };
    if (opt === 'ease') {
      optionalBody.isLearned = true;
    }
    return this.http.post<HardWords>(`${this.baseUrl}/users/${idUser}/words/${idWord}`, {
      difficulty: opt,
      optional: optionalBody,
    });
  }

  removeHardWord(idUser: string, idWord: string) {
    return this.http.delete(`${this.baseUrl}/users/${idUser}/words/${idWord}`);
  }

  getHardWords(idUser: string): Observable<HardWords[]> {
    return this.http.get<HardWords[]>(`${this.baseUrl}/users/${idUser}/words`);
  }

  updateHardWords(idUser: string, idWord: string, opt?: string): Observable<HardWords> {
    return this.http.put<HardWords>(`${this.baseUrl}/users/${idUser}/words/${idWord}`, {
      difficulty: 'ease',
      optional: {
        isLearned: true,
      },
    });
  }

  updateEaseWord(idUser: string, idWord: string): Observable<HardWords> {
    return this.http.put<HardWords>(`${this.baseUrl}/users/${idUser}/words/${idWord}`, {
      difficulty: 'hard',
      optional: {
        isLearned: false,
      },
    });
  }

  getStat(idUser: string) {
    return this.http.get<[]>(`${this.baseUrl}/users/${idUser}/words`);
  }
  getGameStats(idUser: string) {
    return this.http.get<IUserStatista>(`${this.baseUrl}/users/${idUser}/statistics`);
  }
  setSessionStorage(obj: Parameters): void {
    localStorage.setItem('parameters', JSON.stringify(obj));
  }
}
