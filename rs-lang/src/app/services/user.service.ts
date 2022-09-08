import { Injectable } from '@angular/core';
import { HardWords, IUserStatista, IWord } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { AuthorizationService } from './authorization.service';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private data: DataService,
    private apiService: ApiService,
    private authService: AuthorizationService,
    private localStorageService: LocalStorageService,
  ) {}

  newSprintGameWords: HardWords[] = [];
  newAudioGameWords: HardWords[] = [];

  checkWord(word: IWord, opt: string) {
    const wordId = word?.id ? word.id : word._id;
    const otherWord = opt === 'hard' ? 'easeWords' : 'hardWords';
    const thisWord = opt === 'hard' ? 'hardWords' : 'easeWords';
    if (this.data.parameters[otherWord]?.includes(wordId)) {
      this.replaceWord(wordId, opt);
    } else {
      if (!this.data.parameters[thisWord]?.includes(wordId)) {
        this.addWord(wordId, opt);
      }
    }
  }

  addWord(id: string, opt: string) {
    const ourWord = opt === 'hard' ? 'hardWords' : 'easeWords';
    const ourArr = opt === 'hard' ? 'arr' : 'arrEase';
    this.apiService.postWord(this.data.user.userId, id, opt).subscribe((res) => {
      this.data.parameters[ourArr]?.push(res as HardWords);
      this.apiService.setSessionStorage(this.data.parameters);
      this.setNewWord(res);
      this.data.checkArrEase();
    });
    this.data.parameters[ourWord]?.push(id);
    this.apiService.setSessionStorage(this.data.parameters);
  }

  replaceWord(id: string, opt: string) {
    const otherWord = opt === 'hard' ? 'easeWords' : 'hardWords';
    const ourWord = opt === 'hard' ? 'hardWords' : 'easeWords';
    const ourArr = opt === 'hard' ? 'arr' : 'arrEase';
    const otherArr = opt === 'hard' ? 'arrEase' : 'arr';
    this.data.parameters[otherWord]?.splice(
      this.data.parameters[otherWord]!.findIndex((el) => el === id),
      1,
    );
    this.data.parameters[ourWord]?.push(id);
    const a = this.data.parameters[otherArr]?.splice(
      this.data.parameters[otherArr]!.findIndex((el) => el.wordId === id),
      1,
    );
    this.data.parameters[ourArr]?.push(a![0]);
    this.apiService.updateHardWords(this.data.user.userId, id, opt).subscribe();
    this.deleteHard(id);
    this.data.checkArrEase();
    this.apiService.setSessionStorage(this.data.parameters);
  }

  deleteHard(idWord: string) {
    if (this.data.parameters.currentLevel === 6) {
      this.data.parameters.words?.splice(
        this.data.parameters.words!.findIndex((el) => el.id === idWord),
        1,
      );
    }
  }

  getUserWords() {
    const userId = this.authService.getUserId();
    const url = `users/${userId}/words`;
    return this.apiService.get<HardWords[]>(url);
  }

  setNewWord(word: HardWords) {
    const gameName = this.localStorageService.getLocalStorage('gameName');
    if (gameName === 'sprint') {
      this.newSprintGameWords.push(word);
    } else {
      this.newAudioGameWords.push(word);
    }
  }

  setGameStatistics(gameName: string, correctPercent: number, correctSeries: number) {
    const currentUserStatista = this.authService.currentUserStatista;
    if (gameName === 'sprint') {
      const newWordsNumber = this.newSprintGameWords.length;
      this.authService.currentUserStatista.learnedWords += newWordsNumber;
      this.authService.getLastDateStatista().sprint.correctPercents.push(correctPercent);
      this.authService.getLastDateStatista().sprint.series.push(correctSeries);
      this.authService.getLastDateStatista().sprint.newWords.push(...this.newSprintGameWords);
    } else {
      const newWordsNumber = this.newAudioGameWords.length;
      this.authService.currentUserStatista.learnedWords += newWordsNumber;
      this.authService.getLastDateStatista().audio.correctPercents.push(correctPercent);
      this.authService.getLastDateStatista().audio.series.push(correctSeries);
      this.authService.getLastDateStatista().audio.newWords.push(...this.newAudioGameWords);
    }
    this.localStorageService.setLocalStorage(
      'userStatistics',
      JSON.stringify(this.authService.currentUserStatista),
    );
    this.authService.putStatista(this.authService.currentUserStatista);
  }

  getUserStatista() {
    const userId = this.authService.getUserId();
    const url = `users/${userId}/statistics`;
    return this.apiService.get<IUserStatista>(url);
  }
}
