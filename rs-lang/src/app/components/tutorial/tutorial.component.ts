import { Component, OnInit } from '@angular/core';

export interface Level {
  id: number
  digit: string,
  title: string
  text: string,
  words: number,
  color: string
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  mouseOver = false;

  levels: Level[] = [
    {id: 1, digit: 'A1', title: 'Beginner', text: 'Понимать интонацию и жесты собеседника. Говорить: "London is the capital of Great Britain".', words: 600, color: "green"},
    {id: 2, digit: 'A2', title: 'Elementary', text: 'Разговаривать с новорожденными детьми. Слушать англоязычную музыку, делая вид что что-то понимаешь.', words: 1200, color: "orange"},
    {id: 3, digit: 'B1', title: 'Pre-Intermediate', text: 'Пройти тест по английскому языку, чтобы устроиться фронтенд-разработчиком.', words: 1800, color: "blue"},
    {id: 4, digit: 'B2', title: 'Intermediate', text: 'Употреблять английские слова в своей речи. Там, где надо и не надо.', words: 2400, color: "yellowgreen"},
    {id: 5, digit: 'C1', title: 'Upper-Intermediate', text: 'Мимикрировать под рядового жителя Брайтон-Бич.', words: 3000, color: "violet"},
    {id: 6, digit: 'C2', title: 'Advanced', text: 'Расслабиться. Потому что никто не знает английский на таком уровне, кроме королевы Великобритании.', words: 3600, color: "red"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
