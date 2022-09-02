import { Component, Input, OnInit } from '@angular/core';
import { HardWords, Level, Word } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(
    public data: DataService,
    public apiService: ApiService,
    private gameService: GameService,
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
    this.apiService.getWords(String(this.data.parameters.currentLevel), '0').subscribe((value) => {
      this.data.parameters.words = JSON.parse(JSON.stringify(value));
      this.data.checkArrEase();
      this.apiService.setSessionStorage(this.data.parameters);
    });
  }

  play(e: Event, Meaning: string, Example: string): void {
    e.preventDefault();
    let audio = [
      Meaning,
      Example,
    ];
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
    };

    playAudio();
  }

  changePage(page: string) {
    switch (page) {
      case '0':
        if (this.data.parameters.page !== 0) {
          this.data.parameters.page = 0;
          this.getWords();
        }
        break;
      case '-1':
        if (this.data.parameters.page > 0) {
          this.data.parameters.page = this.data.parameters.page -= 1;
          this.getWords();
        }
        break;
      case '+1':
        if (this.data.parameters.page < 29 && this.data.parameters.currentLevel !== 6) {
          this.data.parameters.page = this.data.parameters.page += 1;
          this.getWords();
        }
        break;
      case '29':
        if (this.data.parameters.page !== 29 && this.data.parameters.currentLevel !== 6) {
          this.data.parameters.page = 29;
          this.getWords();
        }
        break;
    }
  }

  getWords() {
    this.apiService
      .getWords(String(this.data.parameters.currentLevel), String(this.data.parameters.page))
      .subscribe((value) => {
      this.data.parameters.words = JSON.parse(JSON.stringify(value));
      this.data.checkArrEase();
      this.apiService.setSessionStorage(this.data.parameters);
    });
  }

  checkWord(e: Event, word: Word, opt: string) {
    e.preventDefault();
    const otherWord = opt === 'hard' ? 'easeWords' : 'hardWords';
    if (this.data.parameters[otherWord]?.includes(word.id)) {
      this.replaceWord(word, opt);
    } else {
      this.addWord(word, opt);
    }
  }

  addWord(word: Word, opt: string) {
    const ourWord = opt === 'hard' ? 'hardWords' : 'easeWords';
    const ourArr = opt === 'hard' ? 'arr' : 'arrEase';
    this.apiService.postWord(this.data.user.userId, word.id, opt).subscribe((res) => {
      this.data.parameters[ourArr]?.push(res as HardWords);
      this.apiService.setSessionStorage(this.data.parameters);
      this.data.checkArrEase();
    });
    this.data.parameters[ourWord]?.push(word.id);
    this.apiService.setSessionStorage(this.data.parameters);
  }

  replaceWord(word: Word, opt: string) {
    const otherWord = opt === 'hard' ? 'easeWords' : 'hardWords';
    const ourWord = opt === 'hard' ? 'hardWords' : 'easeWords';
    const ourArr = opt === 'hard' ? 'arr' : 'arrEase';
    const otherArr = opt === 'hard' ? 'arrEase' : 'arr';
    this.data.parameters[ourWord]?.push(word.id);
    this.data.parameters[otherWord]?.splice(
      this.data.parameters[otherWord]!.findIndex((el) => el === word.id),
      1,
    );
    const a = this.data.parameters[otherArr]?.splice(
      this.data.parameters[otherArr]!.findIndex((el) => el.id === word.id),
      1,
    );
    this.data.parameters[ourArr]?.push(a![0]);
    this.apiService.updateHardWords(this.data.user.userId, word.id, opt);
    this.deleteHard(word.id);
    this.data.checkArrEase();
  }

  removeWord(e: Event, idWord: string, opt: string) {
    e.preventDefault();
    const option = opt === 'hard' ? 'hardWords' : 'easeWords';
    const array = opt === 'hard' ? 'arr' : 'arrEase';
    this.apiService.removeHardWord(this.data.user.userId, idWord).subscribe((res) => {
      this.data.parameters[array]?.splice(
        this.data.parameters[array]!.findIndex((el) => el.wordId === idWord),
        1,
      );
      this.apiService.setSessionStorage(this.data.parameters);
      this.data.checkArrEase();
    });
    this.data.parameters[option]?.splice(this.data.parameters[option]!.indexOf(idWord), 1);
    this.deleteHard(idWord);
    this.apiService.setSessionStorage(this.data.parameters);
  }

  deleteHard(idWord: string) {
    if (this.data.parameters.currentLevel === 6) {
      this.data.parameters.words?.splice(
        this.data.parameters.words!.findIndex((el) => el.id === idWord),
        1,
      );
    }
    const a = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ].every((el) =>
      [
        1,
        2,
        3,
      ]?.includes(el.id),
    )
      ? 'black'
      : 'white';
  }

  onTutorial() {
    if (this.data.parameters.currentLevel !== 6) {
      this.data.parameters.prevLevel = this.data.parameters.currentLevel;
      this.data.parameters.prevPage = this.data.parameters.page;
    }
    if (this.data.parameters.words) this.data.parameters.words!.length = 0;
    this.data.parameters.currentLevel = 6;
    this.data.parameters.page = 0;
    this.getHardWords(this.data.parameters.arr!);
  }

  getHardWords(arr: HardWords[]) {
    const array: Word[] = [];
    arr.map((el, ind, arr) => {
      this.apiService.getWord(el.wordId).subscribe((value) => {
        array.push(JSON.parse(JSON.stringify(value)));
        if (ind === arr.length - 1) {
          this.data.parameters.words = array;
          this.data.checkArrEase();
          this.apiService.setSessionStorage(this.data.parameters);
        }
      });
    });
    return array;
  }

  setGame(gameName: string): void {
    this.gameService.setCurrentGame(gameName);
    this.setPage();
  }

  setPage(): void {
    const currentPage = this.data.parameters.page;
    this.gameService.setCurrentPage(currentPage);
  }

  backTutorial() {
    this.data.parameters.currentLevel = this.data.parameters.prevLevel;
    this.data.parameters.page = this.data.parameters.prevPage;
    this.apiService.getWords(String(this.data.parameters.currentLevel), String(this.data.parameters.page)).subscribe(value => {
      this.data.parameters.words = JSON.parse(JSON.stringify(value));
      this.data.checkArrEase();
      this.apiService.setSessionStorage(this.data.parameters);
    });
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }
}
