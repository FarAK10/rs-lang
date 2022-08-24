import { Component } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { LocalStorageService } from './services/local-storage.service';
import { OnInit } from '@angular/core';
import { Level } from './interfaces/interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'rs-lang';
  
  levels: Level[] = [
    {id: 1, digit: 'A1', title: 'Beginner', text: 'Понимать интонацию и жесты собеседника. Говорить: "London is the capital of Great Britain".', words: 600, color: "red"},
    {id: 2, digit: 'A2', title: 'Elementary', text: 'Разговаривать с детьми. Слушать англоязычную музыку, делая вид, что что-то понимаете.', words: 1200, color: "orange"},
    {id: 3, digit: 'B1', title: 'Pre-Intermediate', text: 'Пройти тест по английскому языку, чтобы устроиться фронтенд-разработчиком.', words: 1800, color: "yellowgreen"},
    {id: 4, digit: 'B2', title: 'Intermediate', text: 'Употреблять английские слова в своей речи. Там, где надо и не надо.', words: 2400, color: "green"},
    {id: 5, digit: 'C1', title: 'Upper-Intermediate', text: 'Мимикрировать под рядового жителя окраины Брайтон-Бич.', words: 3000, color: "blue"},
    {id: 6, digit: 'C2', title: 'Advanced', text: 'Расслабиться. Потому что никто не знает английский на таком уровне, кроме королевы Великобритании.', words: 3600, color: "violet"},
  ]
  parameters!: Level;

  checkParameters(parameters: Level) {
    this.parameters = Object.assign(parameters);
  }

  constructor(
    private authSerice: AuthorizationService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(this.localStorageService.getLocalStorage('user') as string);
    if (user) {
      this.authSerice.currentUser = user;
    }
  }
}
