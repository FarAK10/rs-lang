import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { ICurrentUser, INewUser } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs';
import { of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ERROR_CODES } from '../shared/enums';
import { GameService } from './game.service';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) {}
  isAuth = false;
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
        },
        (err) => {
          alert('incorrect password or token is experid');
          this.resoursesLoaded$.next(true);
        },
      );
  }

  setCurrentUser(user: ICurrentUser) {
    this.currentUser = user;
    this.isAuth = true;
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
}
