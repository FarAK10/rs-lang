import { Component, OnInit } from '@angular/core';

export interface Level {
  id?: number
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

  parameters: Level = {
    digit: '',
    title: '',
    text: '',
    words: 0,
    color: ''
  }


  levels: Level[] = [
    {id: 1, digit: 'A1', title: 'Beginner', text: 'Понимать интонацию и жесты собеседника. Говорить: "London is the capital of Great Britain".', words: 600, color: "red"},
    {id: 2, digit: 'A2', title: 'Elementary', text: 'Разговаривать с детьми. Слушать англоязычную музыку, делая вид, что что-то понимаешь.', words: 1200, color: "orange"},
    {id: 3, digit: 'B1', title: 'Pre-Intermediate', text: 'Пройти тест по английскому языку, чтобы устроиться фронтенд-разработчиком.', words: 1800, color: "yellowgreen"},
    {id: 4, digit: 'B2', title: 'Intermediate', text: 'Употреблять английские слова в своей речи. Там, где надо и не надо.', words: 2400, color: "green"},
    {id: 5, digit: 'C1', title: 'Upper-Intermediate', text: 'Мимикрировать под рядового жителя Брайтон-Бич.', words: 3000, color: "blue"},
    {id: 6, digit: 'C2', title: 'Advanced', text: 'Расслабиться. Потому что никто не знает английский на таком уровне, кроме королевы Великобритании.', words: 3600, color: "violet"},
  ]

  constructor() { }

  onMouseOver(e: Event) {
    let target = e.target as HTMLElement;
    document.querySelectorAll('.level__card').forEach((el) => {
      el.classList.remove('active');
    })
    target.classList.add('active');
    this.setParameters(Number(target.id));
  }

  setParameters(id: number) {
    this.parameters.title = this.levels[Number(id-1)].title;
    this.parameters.text = this.levels[Number(id-1)].text;
    this.parameters.digit = this.levels[Number(id-1)].digit;
    this.parameters.words = this.levels[Number(id-1)].words;
    this.parameters.color = this.levels[Number(id-1)].color;
  }

  ngOnInit(): void {
    this.setParameters(1);
  }
  
}
