import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { EaseWords, HardWords, ICurrentUser, INewUser } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs';
import { of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ERROR_CODES } from '../shared/enums';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private apiService: ApiService, private localStorageService: LocalStorageService, private data: DataService) {}
  isAuth = true;
  currentUser!: ICurrentUser;

  resoursesLoaded$ = new BehaviorSubject<boolean>(true);

  register(newUser: INewUser): void {
    this.apiService.post('users', newUser).subscribe({
      next: () => {
        this.singIn(newUser);
        this.resoursesLoaded$.next(true);
      },
      error: (err) => {
        if (err.status === ERROR_CODES.userExists) {
          this.resoursesLoaded$.next(true);
          alert('user with such email already exists');
        }
      },
    });
  }

  singIn(newUser: INewUser): void {
    this.apiService
      .post('signin', newUser)
      .pipe(
        map((newUser: INewUser) => {
          return newUser as unknown as ICurrentUser;
        }),
      )
      .subscribe(
        (res: ICurrentUser) => {
          this.currentUser = res;
          this.localStorageService.setLocalStorage('user', JSON.stringify(this.currentUser));
          this.resoursesLoaded$.next(true);
          this.isAuth = true;
          this.setHardWords();
        },
        (err) => {
          alert('incorrect password or token is experid');
          this.resoursesLoaded$.next(true);
        },
      );
  }

  getToken(): string {
    return this.currentUser?.token;
  }

  getUserId(): string {
    return this.currentUser?.userId;
  }
  getUser(): ICurrentUser {
    return this.currentUser;
  }

  setHardWords() {
    this.apiService.getHardWords(this.getUserId()).subscribe(value => {
      const arr = (value as HardWords[]).filter((el) => el.difficulty === 'hard');
      const arr2 = (value as EaseWords[]).filter((el) => el.difficulty === 'ease');
      this.data.parameters.hardWords = this.parseHardWords(arr);
      this.data.parameters.easeWords = this.parseHardWords(arr2);
      this.data.parameters.arr = JSON.parse(JSON.stringify(arr));
      this.data.parameters.arrEase = JSON.parse(JSON.stringify(arr2));
      this.apiService.setSessionStorage(this.data.parameters);
      this.data.getUser();
    });
  }

  parseHardWords(arr: HardWords[]) {
    const array: String[] = [];
    arr.map((el) => array.push(el.wordId));
    return array;
  }
}
