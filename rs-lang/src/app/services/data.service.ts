import { Injectable, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ICurrentUser, Level, Parameters } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private translateService: TranslateService) {
    if (localStorage.getItem('parameters')) {
      this.parameters = JSON.parse(localStorage.getItem('parameters')!);
    }
    this.getUser();
    this.checkArrEase();
  }

  allEase: boolean = false;
  lang: string | null = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru';

  levels: Level[] = [
    {
      id: 0,
      digit: 'A1',
      title: 'levels.titleA1',
      text: 'levels.textA1',
      words: 600,
      color: 'red',
    },
    {
      id: 1,
      digit: 'A2',
      title: 'levels.titleA2',
      text: 'levels.textA2',
      words: 1200,
      color: 'orange',
    },
    {
      id: 2,
      digit: 'B1',
      title: 'levels.titleB1',
      text: 'levels.textB1',
      words: 1800,
      color: 'yellowgreen',
    },
    {
      id: 3,
      digit: 'B2',
      title: 'levels.titleB2',
      text: 'levels.textB2',
      words: 2400,
      color: 'green',
    },
    {
      id: 4,
      digit: 'C1',
      title: 'levels.titleC1',
      text: 'levels.textC1',
      words: 3000,
      color: 'blue',
    },
    {
      id: 5,
      digit: 'C2',
      title: 'levels.titleC2',
      text: 'levels.textC2',
      words: 3600,
      color: 'violet',
    },
  ];

  parameters: Parameters = {
    words: null,
    page: 0,
    currentLevel: 0,
    hardWords: null,
    arr: null,
    easeWords: null,
    arrEase: null,
    prevPage: 0,
    prevLevel: 0,
  };

  defaultParameters: Parameters = {
    words: null,
    page: 0,
    currentLevel: 0,
    hardWords: null,
    arr: null,
    easeWords: null,
    arrEase: null,
    prevPage: 0,
    prevLevel: 0,
  };

  user: ICurrentUser = {
    message: '',
    name: '',
    refreshToken: '',
    token: '',
    userId: '',
    isAuth: false,
  };

  getUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.user.isAuth = true;
    }
  }

  checkArrEase() {
    this.allEase = this.parameters.words?.every((el) => this.parameters.easeWords?.includes(el.id))
      ? true
      : false;
  }

  setLanguage(languageCode: string) {
    this.translateService.use(languageCode);
    this.lang = languageCode;
    localStorage.setItem('lang', this.lang);
  }
}
