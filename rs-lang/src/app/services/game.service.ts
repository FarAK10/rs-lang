import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs';
import { IAggregatedResp, IWord } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  aggreagatedWords: Array<IWord> = [];

  difficulty: string = '5';

  currentPage: number = 1;

  wordsPerPage: number = 200;

  answeredCorrectly: Array<IWord> = [];

  answeredWrongly: Array<IWord> = [];

  constructor(private apiService: ApiService, private authService: AuthorizationService) {}

  getAggregatedWords() {
    const userId = this.authService.getUserId();
    const url = `users/${userId}/aggregatedWords?group=${this.difficulty}&wordsPerPage=${this.wordsPerPage}`;
    return this.apiService.get<[IAggregatedResp]>(url);
  }

  pushCorrect(word: IWord) {
    this.answeredCorrectly.push(word);
  }

  pushWrong(word: IWord) {
    this.answeredWrongly.push(word);
  }
}
