import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, Observable, last } from 'rxjs';
import {
  EaseWords,
  HardWords,
  ICurrentUser,
  IDayStatista,
  INewUser,
  IUserStatista,
} from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs';
import { of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ERROR_CODES } from '../shared/enums';
import { DataService } from './data.service';
import { identifierModuleUrl } from 'angular-html-parser/lib/compiler/src/compile_metadata';
import { BoundElementProperty, ThisReceiver } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private data: DataService,
  ) {}
  isAuth = false;
  currentUser!: ICurrentUser;

  resoursesLoaded$ = new BehaviorSubject<boolean>(true);

  userWords!: HardWords[];

  defaultDateStatista: IDayStatista = {
    date: new Date(),
    sprint: {
      correctPercents: [],
      newWords: [],
      series: [],
    },
    audio: {
      correctPercents: [],
      newWords: [],
      series: [],
    },
  };

  currentUserStatista: IUserStatista = {
    learnedWords: 0,
    optional: {
      dates: [this.defaultDateStatista],
    },
  };

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
          localStorage.clear();
          this.localStorageService.setLocalStorage('user', JSON.stringify(this.currentUser));
          this.resoursesLoaded$.next(true);
          this.isAuth = true;
          this.setHardWords();
          this.getInitialStatista();
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

  setHardWords() {
    this.data.parameters = JSON.parse(JSON.stringify(this.data.defaultParameters));
    this.apiService.getHardWords(this.getUserId()).subscribe((value) => {
      this.userWords = value;
      const arr = value.filter((el) => el.difficulty === 'hard');
      const arr2 = value.filter((el) => el.difficulty === 'ease');
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

  getInitialStatista() {
    const userId = this.getUserId();
    const url = `users/${userId}/statistics`;
    this.apiService.get<IUserStatista>(url).subscribe({
      next: (res: IUserStatista) => {
        this.currentUserStatista = res;
        res.optional.dates = JSON.parse(res.optional.dates as string);
        this.checkDate(this.currentUserStatista);
      },
      error: (err) => {
        if (err.status === 404) {
          this.setInitialStatista();
        }
      },
    });
  }

  setInitialStatista() {
    const body: IUserStatista = {
      learnedWords: 0,
      optional: {
        dates: JSON.stringify([this.defaultDateStatista]),
      },
    };
    this.putStatista(body);
  }

  putStatista(res: IUserStatista) {
    const userId = this.getUserId();
    const url = `users/${userId}/statistics`;
    const { id, ...body } = res;
    body.optional.dates = JSON.stringify(body.optional.dates);
    console.log(url, body);
    this.apiService.put<IUserStatista>(url, body).subscribe(() => {
      body.optional.dates = JSON.parse(body.optional.dates as string);
    });
  }

  checkDate(res: IUserStatista) {
    const datesLength = res.optional.dates.length;
    const lastDateStatista = res.optional.dates[datesLength - 1];
    const lastDate = (lastDateStatista as IDayStatista).date;
    const penultDateStatista = res.optional.dates[datesLength - 2];
    const penultDate = (penultDateStatista as IDayStatista).date;
    const hoursDiff = this.timeDiff(lastDate, penultDate);
    if (hoursDiff >= 24) {
      console.log('hours', hoursDiff);
      (res.optional.dates as IDayStatista[]).push(this.defaultDateStatista);
      this.putStatista(res);
    }
  }

  timeDiff(last: Date, penult: Date) {
    const msBetweenDates = Math.abs(last.getTime() - penult.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    return hoursBetweenDates;
  }

  getLastDateStatista() {
    const datesLength = this.currentUserStatista.optional.dates.length;
    const lastDateStatista = this.currentUserStatista.optional.dates[datesLength - 1];
    return lastDateStatista as IDayStatista;
  }
}
