import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HardWords, Level, Word } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit, AfterViewChecked {

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
  ) { }

  onMouseOver(e: Event) {
    let target = e.target as HTMLElement;
    document.querySelectorAll('.level__card').forEach((el) => {
      el.classList.remove('active');
    })
    target.classList.add('active');
    this.setParameters(Number(target.id));
  }

  onCheck() {
    this.data.parameters.currentLevel = Number(this.setting.id);
    this.data.parameters.page = 0;
    this.apiService.getWords(String(this.data.parameters.currentLevel), '0').subscribe(value => {
      this.data.parameters.words = JSON.parse(JSON.stringify(value));
      this.data.checkArrEase();
      this.apiService.setSessionStorage(this.data.parameters);
    });
  }

  onTutorial() {
    if (this.data.parameters.currentLevel !== 6) {
      this.data.parameters.prevLevel = this.data.parameters.currentLevel;
      this.data.parameters.prevPage = this.data.parameters.page;
    }
    this.data.parameters.words!.length = 0;
    this.data.parameters.currentLevel = 6;
    this.data.parameters.page = 0;
    this.getHardWords(this.data.parameters.arr!);
  }

  getHardWords(arr: HardWords[]) {
    const array: Word[] = [];
    arr.map((el, ind, arr) => {
      this.apiService.getWord(el.wordId).subscribe(value => {
        array.push(JSON.parse(JSON.stringify(value)));
        if (ind === arr.length - 1) {
          this.data.parameters.words = array;
          this.data.checkArrEase();
          this.apiService.setSessionStorage(this.data.parameters);
        }
      });
    })
    return array;
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

