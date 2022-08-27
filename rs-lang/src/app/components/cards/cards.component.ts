import { Component, Input, OnInit } from '@angular/core';
import { Level, Word } from 'src/app/interfaces/interfaces';
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
    if (pagination!.offsetTop >= 110) {
      pagination?.classList.add('enable');
      list?.classList.add('enable');
    } else {
      pagination?.classList.remove('enable');
      list?.classList.remove('enable');
    }
  }

  onCheck(e: Event) {
    const target = e.target as HTMLElement;
    this.data.parameters.currentLevel = Object.assign({}, this.data.levels[Number(target.id)]);
    this.data.parameters.page = 0;
    this.apiService.getWords(String(this.data.parameters.currentLevel.id), '0').subscribe(value => {
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
    switch(page) {
      case ('0') :
        this.data.parameters.page = 0;
        break;
      case ('-1') :
        this.data.parameters.page = this.data.parameters.page -= 1;
        break;
      case ('+1') :
        this.data.parameters.page = this.data.parameters.page += 1;
        break;
      case ('29') :
        this.data.parameters.page = 29;
        break;
      default :
        this.data.parameters.page = this.data.parameters.page;
    }
    this.apiService.getWords(String(this.data.parameters.currentLevel.id), String(this.data.parameters.page)).subscribe(value => {
      this.data.parameters.words = JSON.parse(JSON.stringify(value));
      this.apiService.setSessionStorage(this.data.parameters);
    });

  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

}
