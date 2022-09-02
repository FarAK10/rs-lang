import { Injectable } from '@angular/core';
import { HardWords, Word } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private data: DataService,
    private apiService: ApiService
  ) { }

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
}
