import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Level } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  // @Input() levels!:Level[];
  // @Output() onAdd: EventEmitter<Level> = new EventEmitter<Level>();

  setting: Level = {
    id: 0,
    digit: '',
    title: '',
    text: '',
    words: 0,
    color: ''
  }

  constructor(
    public data: DataService,
    private apiService: ApiService
  ) {}

  onMouseOver(e: Event) {
    let target = e.target as HTMLElement;
    document.querySelectorAll('.level__card').forEach((el) => {
      el.classList.remove('active');
    })
    target.classList.add('active');
    this.setParameters(Number(target.id));
    console.log(this.data.words);
  }

  onCheck() {
    this.data.currentLevel = Object.assign({}, this.setting);
    this.data.page = 0;
    this.apiService.getWords(String(this.data.currentLevel.id), '0').subscribe(value => {
      this.data.words = JSON.parse(JSON.stringify(value));
      this.apiService.setLocalstorage(this.data.page, this.data.currentLevel, this.data.words);
    });
  }

  setParameters(id: number) {
    this.setting.id = id;
    this.setting.title = this.data.levels[Number(id)].title;
    this.setting.text = this.data.levels[Number(id)].text;
    this.setting.digit = this.data.levels[Number(id)].digit;
    this.setting.words = this.data.levels[Number(id)].words;
    this.setting.color = this.data.levels[Number(id)].color;
  }

  ngOnInit(): void {
    this.setParameters(0);
  }

  ngAfterViewChecked(): void {
    const el: HTMLElement | null = document.querySelector('.active');
    this.setParameters(Number(el?.getAttribute('id')));
  }
  
}

