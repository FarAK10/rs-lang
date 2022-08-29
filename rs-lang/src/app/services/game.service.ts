import { Injectable } from '@angular/core';
import { flatMap, Observable } from 'rxjs';
import { IAggregatedResp, IWord } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  aggreagatedWords: Array<IWord> = [];

  englishLevel: string = '5';

  currentPage: number = 1;

  wordsPerPage: number = 200;

  correctAnswers: Array<IWord> = [];

  incorrectAnswers: Array<IWord> = [];

  correctWord: string = '';

  currentGame!: string;

  constructor(private apiService: ApiService, private authService: AuthorizationService) {}

  getAggregatedWords() {
    const userId = this.authService.getUserId();
    const url = `users/${userId}/aggregatedWords?group=${this.englishLevel}&wordsPerPage=${this.wordsPerPage}`;
    return this.apiService.get<[IAggregatedResp]>(url);
  }

  getWords(page: number) {
    const url = `words?group=${this.englishLevel}&page=${page}`;
    return this.apiService.get<IWord[]>(url);
  }

  pushCorrect(word: IWord) {
    this.correctAnswers.push(word);
  }

  pushWrong(word: IWord) {
    this.incorrectAnswers.push(word);
  }

  setEnglishLevel(level: number): void {
    this.englishLevel = level.toString();
  }

  getEnglishLevel(): string {
    return this.englishLevel;
  }

  getGameName(): string {
    return this.currentGame;
  }
}
