import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, switchMap } from 'rxjs';
import { ICurrentUser, INewUser } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { of } from 'rxjs';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private apiService: ApiService) {}

  currentUser!: ICurrentUser;

  resorsesLoaded$ = new BehaviorSubject<boolean>(true);

  createUser(newUSer: INewUser): void {
    this.apiService
      .post('users', newUSer)
      .pipe(switchMap(() => of(this.singIn(newUSer))))
      .subscribe({
        next: () => {
          console.log('created');
          this.resorsesLoaded$.next(true);
        },
        error: (err) => {
          if (err.status === 417) {
            this.resorsesLoaded$.next(true);
            alert('use with such email already exists');
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
          this.resorsesLoaded$.next(true);
        },
        (err) => {
          alert('token is expired');
          this.resorsesLoaded$.next(true);
        },
      );
  }
}
