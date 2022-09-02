import { Component, Input, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { HardWords, IWord, Level, Word } from 'src/app/interfaces/interfaces';
import { ThrowStmt } from 'angular-html-parser/lib/compiler/src/output/output_ast';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { GameService } from 'src/app/services/game.service';
import { Route, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

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
    private authService: AuthorizationService,
    private router: Router,
    public userService: UserService,
  ) {}

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
    this.userService.deleteHard(idWord);
    this.apiService.setSessionStorage(this.data.parameters);
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
    this.gameService.isLaunchedFromMenu = false;
    this.setPage();
    this.setLevel();
    this.router.navigate([`/game/${gameName}`]);
  }

  setPage(): void {
    const currentPage = this.data.parameters.page;
    console.log(currentPage);
    this.gameService.setCurrentPage(currentPage);
  }

  setLevel(): void {
    const level = this.data.parameters.currentLevel;
    this.gameService.setEnglishLevel(level);
  }

  backTutorial() {
    this.data.parameters.currentLevel = this.data.parameters.prevLevel;
    this.data.parameters.page = this.data.parameters.prevPage;
    this.apiService
      .getWords(String(this.data.parameters.currentLevel), String(this.data.parameters.page))
      .subscribe((value) => {
        this.data.parameters.words = JSON.parse(JSON.stringify(value));
        this.data.checkArrEase();
        this.apiService.setSessionStorage(this.data.parameters);
      });
  }

  checkWord(e: Event, word: Word, difficulty: string) {
    e.preventDefault();
    this.userService.checkWord(word, difficulty);
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }
}
