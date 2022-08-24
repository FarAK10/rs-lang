import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Level } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  @Input() levels!:Level[];
  @Output() onAdd: EventEmitter<Level> = new EventEmitter<Level>();

  parameters: Level = {
    id: 0,
    digit: '',
    title: '',
    text: '',
    words: 0,
    color: ''
  }

  constructor() { }

  onMouseOver(e: Event) {
    let target = e.target as HTMLElement;
    document.querySelectorAll('.level__card').forEach((el) => {
      el.classList.remove('active');
    })
    target.classList.add('active');
    this.setParameters(Number(target.id));
  }

  onCheck() {
    this.onAdd.emit(this.parameters);
  }

  setParameters(id: number) {
    this.parameters.id = id;
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

