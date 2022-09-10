import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  flatMap,
  from,
  mergeMap,
  observable,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { IAggregatedResp, HardWords, IWord } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { AuthorizationService } from './authorization.service';
import { LocalStorageService } from './local-storage.service';
import { filterLearnedWords, isContains, shuffle } from '../shared/functions';
import { DataService } from './data.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  aggreagatedWords: Array<IWord> = [];

  englishLevel: string = '5';

  currentPage: number = 30;

  wordsPerPage: number = 20;

  userId!: string;

  correctAnswers: Array<IWord> = [];

  incorrectAnswers: Array<IWord> = [];

  correctWord: string = '';

  isLaunchedFromMenu = true;

  currentGame$ = new BehaviorSubject<string>('');

  gameName!: string;

  gameWords: IWord[] = [];

  userWords: HardWords[] = [];

  sprintCorrectSeries: number[] = [];

  audioCorrectSerices: number[] = [];

  isWordsLoaded$ = new BehaviorSubject(true);

  optionalAnswers: IWord[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
  ) {}

  getWords() {
    this.userId = this.authService.getUserId();
    this.gameName = this.getGameName();
    this.isWordsLoaded$.next(false);
    if (this.authService.isAuth) {
      this.userService.getUserWords().subscribe((userWords: HardWords[]) => {
        this.userWords = userWords;
        this.getAuthorizedWords();
      });
    } else {
      this.getUnauthorizedWords();
    }
  }

  getUnauthorizedWords() {
    this.gameWords = [];
    const urls = [];
    for (let i = 0; i <= this.currentPage; i++) {
      const url = `words?group=${this.englishLevel}&page=${i}`;
      urls.push(url);
    }
    of(...urls)
      .pipe(
        mergeMap((url) => this.apiService.get<IWord[]>(url)),
        take(this.currentPage + 1),
      )
      .subscribe({
        next: (words: IWord[]) => {
          this.gameWords.push(...words);
        },
        complete: () => {
          this.isWordsLoaded$.next(true);
        },
      });
  }

  getAuthorizedWords() {
    const userId = this.authService.getUserId();
    if (this.isLaunchedFromMenu) {
      const url = `users/${userId}/aggregatedWords?group=${this.englishLevel}&wordsPerPage=400`;
      this.apiService
        .get<[IAggregatedResp]>(url)
        .pipe(take(1))
        .subscribe((words: IAggregatedResp[]) => {
          this.gameWords = shuffle(words[0].paginatedResults);
          this.isWordsLoaded$.next(true);
        });
    } else {
      this.gameWords = [];
      const urls = [];
      for (let i = this.currentPage; i >= 0; i--) {
        const url = `users/${userId}/aggregatedWords?filter={ "$and": [{ "page": ${i} }, {"group": ${this.englishLevel}}] }&wordsPerPage=20`;
        urls.push(url);
      }
      of(...urls)
        .pipe(
          mergeMap((url) => this.apiService.get<[IAggregatedResp]>(url)),
          take(this.currentPage + 1),
        )
        .subscribe({
          next: (words: [IAggregatedResp]) => {
            this.optionalAnswers.push(...shuffle(words[0].paginatedResults));
            const filtered = filterLearnedWords(words[0].paginatedResults);
            this.gameWords.push(...filtered);
          },
          complete: () => {
            this.isWordsLoaded$.next(true);
          },
        });
    }
  }

  pushCorrect(word: IWord): void {
    this.correctAnswers.push(word);
    if (this.authService.isAuth) {
      this.userService.checkWord(word, 'ease');
    }
    this.localStorageService.setLocalStorage('correctAnswers', JSON.stringify(this.correctAnswers));
  }

  pushWrong(word: IWord): void {
    this.incorrectAnswers.push(word);
    if (this.authService.isAuth) {
      this.userService.checkWord(word, 'hard');
    }
    this.localStorageService.setLocalStorage('wrongAnswers', JSON.stringify(this.incorrectAnswers));
  }

  addToSeries(correctInRow: number) {
    if (this.gameName === 'sprint') {
      this.sprintCorrectSeries.push(correctInRow);
      this.localStorageService.setLocalStorage(
        'sprintCorrectSeries',
        JSON.stringify(this.sprintCorrectSeries),
      );
    } else {
      this.audioCorrectSerices.push(correctInRow);
      this.localStorageService.setLocalStorage(
        'audioCorrectSeries',
        JSON.stringify(this.audioCorrectSerices),
      );
    }
  }

  setSeries(correctSeries: number[], gameName: string) {
    if (gameName === 'sprint') {
      this.sprintCorrectSeries = correctSeries;
    } else {
      this.audioCorrectSerices = correctSeries;
    }
  }

  setEnglishLevel(level: number): void {
    this.englishLevel = level.toString();
  }

  getEnglishLevel(): string {
    return this.englishLevel;
  }

  setCurrentGame(gameName: string): void {
    this.currentGame$.next(gameName);
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  setCorrectAnswers(answers: IWord[]): void {
    this.correctAnswers = answers;
  }

  setWrongAnswers(answers: IWord[]): void {
    this.incorrectAnswers = answers;
  }

  setGameName(gameName: string): void {
    this.localStorageService.setLocalStorage('gameName', gameName);
  }

  getGameName(): string {
    return this.localStorageService.getLocalStorage('gameName') as string;
  }

  reset(): void {
    this.correctAnswers.length = 0;
    this.incorrectAnswers.length = 0;
    if (this.gameName === 'sprint') {
      this.sprintCorrectSeries = [];
      this.sprintCorrectSeries.length = 0;
      this.userService.newSprintGameWords.length = 0;
    } else {
      this.audioCorrectSerices = [];
      this.audioCorrectSerices.length = 0;
      this.userService.newAudioGameWords.length = 0;
    }
  }

  setUserId(): void {
    this.userId = this.authService.getUserId();
  }

  setUserWords(): void {
    this.userWords = this.authService.userWords;
  }
}
