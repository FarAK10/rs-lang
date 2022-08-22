import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, Observable } from 'rxjs';
import { ICurrentUser, INewUser } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ERROR_CODES } from '../shared/enums';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private apiService: ApiService, private localStorageService: LocalStorageService) {}

  currentUser!: ICurrentUser;

  resoursesLoaded$ = new BehaviorSubject<boolean>(true);

  createUser(newUser: INewUser): void {
    this.apiService
      .post('users', newUser)
      .pipe(switchMap(() => of(this.singIn(newUser))))
      .subscribe({
        next: () => {
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
        },
        (err) => {
          alert('incorrect password or token is experid');
          this.resoursesLoaded$.next(true);
        },
      );
  }

  getToken(): string {
    return this.currentUser.token;
  }

  ha() {
    console.log('haa');
  }
}
