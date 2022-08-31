import { Injectable } from '@angular/core';
import { BehaviorSubject, flatMap, Observable } from 'rxjs';
import { IAggregatedResp, HardWords, IWord } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { AuthorizationService } from './authorization.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  aggreagatedWords: Array<IWord> = [];

  englishLevel: string = '5';

  currentPage: number = 1;

  wordsPerPage: number = 20;

  userId!: string;

  correctAnswers: Array<IWord> = [];

  incorrectAnswers: Array<IWord> = [];

  correctWord: string = '';

  isLaunchedFromMenu = true;

  currentGame$ = new BehaviorSubject<string>('');

  userWords: HardWords[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthorizationService,
    private localStorageService: LocalStorageService,
  ) {}

  getAggregatedWords() {
    const userId = this.authService.getUserId();
    const url = `users/${userId}/aggregatedWords?group=${this.englishLevel}&wordsPerPage=${this.wordsPerPage}`;
    return this.apiService.get<[IAggregatedResp]>(url);
  }

  getWords(page: number) {
    const url = `words?group=${this.englishLevel}&page=${page}`;
    return this.apiService.get<IWord[]>(url);
  }

  getAuthorizedWords(page: number) {
    let url: string;
    if (this.isLaunchedFromMenu) {
      url = `users/${this.userId}/aggregatedWords?group=${this.englishLevel}&wordsPerPage=${this.wordsPerPage}&page=${page}`;
    } else {
      url = `users/${this.userId}/aggregatedWords?group=${this.englishLevel}&wordsPerPage=${this.wordsPerPage}&page=${page}&filter={"$or":[{"userWord.difficulty":"hard"},{"userWord":null}]}`;
    }
    return this.apiService.get<IWord[]>(url);
  }

  getUnauthorizedWords(page: number) {
    const url = `words?group=${this.englishLevel}&page=${page}`;
    return this.apiService.get<IWord[]>(url);
  }

  pushCorrect(word: IWord) {
    this.correctAnswers.push(word);
    this.localStorageService.setLocalStorage('correctAnswers', JSON.stringify(this.correctAnswers));
  }

  pushWrong(word: IWord) {
    this.incorrectAnswers.push(word);
    this.localStorageService.setLocalStorage('wrongAnswers', JSON.stringify(this.incorrectAnswers));
  }

  getUserWords(): void {
    const userId = this.authService.getUserId();
    const url = `users/${userId}/words`;
    this.apiService.get<HardWords[]>(url).subscribe((userWords: HardWords[]) => {
      this.userWords = userWords;
    });
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

  setGameName(gameName: string) {
    console.log(gameName, 'gameService');
    this.localStorageService.setLocalStorage('gameName', gameName);
  }

  reset() {
    this.correctAnswers = [];
    this.incorrectAnswers = [];
  }

  setUserId() {
    this.userId = this.authService.getUserId();
  }
}
