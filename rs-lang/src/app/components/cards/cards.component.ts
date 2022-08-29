import { Component, Input, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { HardWords, Level, Word } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {


  constructor(
    public data: DataService,
    public apiService: ApiService,
  ) { }

  baseUrl = this.apiService.baseUrl + '/';
  voice!: HTMLAudioElement;

  onScroll() {
    const pagination: HTMLElement | null = document.querySelector('.cards__pagination');
    const list: HTMLElement | null = document.querySelector('.cards__levels');
    if (pagination) {
      if (pagination!.offsetTop >= 180) {
        pagination?.classList.add('enable');
        list?.classList.add('enable');
      } else {
        pagination?.classList.remove('enable');
        list?.classList.remove('enable');
      }
    }
  }

  onCheck(e: Event) {
    const target = e.target as HTMLElement;
    this.data.parameters.currentLevel = Number(target.id);
    this.data.parameters.page = 0;
    this.apiService.getWords(String(this.data.parameters.currentLevel), '0').subscribe(value => {
      this.data.parameters.words = JSON.parse(JSON.stringify(value));
      this.apiService.setSessionStorage(this.data.parameters);
    });

  }

  play(e: Event, Meaning: string, Example: string): void {
    e.preventDefault();
    let audio = [Meaning, Example];
    let count = 0;

    const playAudio = () => {
      if (this.voice) this.voice.pause();
      const currentAudio = new Audio();
      currentAudio.src = audio[count];
      this.voice = currentAudio;
      currentAudio.play();
      count += 1;
      if (count >= audio.length) currentAudio.remove;
      currentAudio.onended = () => playAudio();
    }

    playAudio();
  }

  changePage(page: string) {
    switch (page) {
      case ('0'):
        if (this.data.parameters.page !== 0) {
          this.data.parameters.page = 0;
          this.getWords();
        }
        break;
      case ('-1'):
        if (this.data.parameters.page > 0) {
          this.data.parameters.page = this.data.parameters.page -= 1;
          this.getWords();
        }
        break;
      case ('+1'):
        if (this.data.parameters.page < 29 && this.data.parameters.currentLevel !== 6) {
          this.data.parameters.page = this.data.parameters.page += 1;
          this.getWords();
        }
        break;
      case ('29'):
        if (this.data.parameters.page !== 29 && this.data.parameters.currentLevel !== 6) {
          this.data.parameters.page = 29;
          this.getWords();
        }
        break;
    }
  }

  getWords() {
    this.apiService.getWords(String(this.data.parameters.currentLevel), String(this.data.parameters.page)).subscribe(value => {
      this.data.parameters.words = JSON.parse(JSON.stringify(value));
      this.apiService.setSessionStorage(this.data.parameters);
    });
  }

  addWord(e: Event, word: Word) {
    e.preventDefault();
    this.apiService.postHardWord(this.data.user.userId, word.id).subscribe(res => {
      this.data.parameters.arr?.push(res as HardWords);
    });
    this.data.parameters.hardWords?.push(word.id);

    this.apiService.setSessionStorage(this.data.parameters);
  }

  removeWord(e: Event, idWord: string) {
    e.preventDefault();
    this.apiService.removeHardWord(this.data.user.userId, idWord).subscribe(res => {
      this.data.parameters.arr?.splice(this.data.parameters.arr?.findIndex(el => el.wordId === idWord), 1);
      this.apiService.setSessionStorage(this.data.parameters);
    });
    this.data.parameters.hardWords?.splice(this.data.parameters.hardWords.indexOf(idWord), 1);
    if (this.data.parameters.currentLevel === 6) {
      this.data.parameters.words?.splice(this.data.parameters.words!.findIndex((el) => el.id === idWord), 1);
    }
    this.apiService.setSessionStorage(this.data.parameters);
  }

  onTutorial() {
    this.data.parameters.words = this.getHardWords(this.data.parameters.arr!);
    this.data.parameters.currentLevel = 6;
    this.data.parameters.page = 0;
    this.apiService.setSessionStorage(this.data.parameters);
  }

  getHardWords(arr: HardWords[]) {
    const array: Word[] = [];
    arr.map((el) => {
      this.apiService.getWord(el.wordId).subscribe(value => {
        array.push(JSON.parse(JSON.stringify(value)));
      });
    })
    return array;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

}
