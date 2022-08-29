import { Injectable, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HardWords, ICurrentUser, Level, Parameters, Word } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allEase = false;

  levels: Level[] = [
    { id: 0, digit: 'A1', title: 'Beginner', text: 'Понимать интонацию и жесты собеседника. Говорить: "London is the capital of Great Britain".', words: 600, color: "red" },
    { id: 1, digit: 'A2', title: 'Elementary', text: 'Разговаривать с детьми. Слушать англоязычную музыку, делая вид, что что-то понимаете.', words: 1200, color: "orange" },
    { id: 2, digit: 'B1', title: 'Pre-Intermediate', text: 'Пройти тест по английскому языку, чтобы устроиться фронтенд-разработчиком.', words: 1800, color: "yellowgreen" },
    { id: 3, digit: 'B2', title: 'Intermediate', text: 'Употреблять английские слова в своей речи. Там, где надо и не надо.', words: 2400, color: "green" },
    { id: 4, digit: 'C1', title: 'Upper-Intermediate', text: 'Мимикрировать под рядового жителя окраины Брайтон-Бич.', words: 3000, color: "blue" },
    { id: 5, digit: 'C2', title: 'Advanced', text: 'Расслабиться. Потому что никто не знает столько английских слов, кроме королевы Великобритании.', words: 3600, color: "violet" },
  ]

  
  parameters: Parameters = {
    words: null,
    page: 0,
    currentLevel: 0,
    hardWords: null,
    arr: null,
    easeWords: null,
    arrEase: null
  }

  user: ICurrentUser = {
    message: '',
    name: '',
    refreshToken: '',
    token: '',
    userId: '',
    isAuth: false
  }

  getUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.user.isAuth = true;
    }
  }

  checkAaaEase() {
    this.allEase = (this.parameters.words?.every(el => this.parameters.easeWords?.includes(el.id))) ? true : false;
  }

  constructor() {
    if (localStorage.getItem('parameters')) {
      this.parameters = JSON.parse(localStorage.getItem('parameters')!);
    }

    this.getUser();
    this.checkAaaEase();
  }
}
