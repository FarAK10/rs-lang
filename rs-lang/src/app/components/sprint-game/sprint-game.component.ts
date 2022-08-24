import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { take, windowWhen } from 'rxjs';
import { IAggregatedResp, IWord } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';
import { shuffle } from 'src/app/shared/functions';
@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent implements OnInit {
  constructor(private gameService: GameService) {}

  gameName: string = 'Sprint';

  level!: string;

  isLevelSelected: boolean = false;

  soundIcon: string = 'volume_mute';

  isMute: boolean = false;

  totalPoints: number = 0;

  coefficient: number = 1;

  timeLeft: number = 60;

  aggregatedWords: Array<IWord> = [];

  translation: string = 'перевод';

  englishWord: string = 'translation';

  words: IWord[] = [];

  index: number = 0;

  currentWord!: IWord;

  isCorrect!: boolean;

  rightInRow: number = 0;

  ngOnInit(): void {
    this.gameService
      .getAggregatedWords()
      .pipe(take(1))
      .subscribe((words: [IAggregatedResp]) => {
        this.aggregatedWords = shuffle(words[0].paginatedResults);
        console.log(this.aggregatedWords);
        this.setEnglishWord();
        this.setTranslation();
        this.startAnimation();
        console.log(this.englishWord);
      });
  }

  setLevel(level: string) {
    this.level = level;
    this.isLevelSelected = true;
  }

  onMute(isMute: boolean) {
    this.isMute = isMute;
  }

  elem = document.documentElement;

  onFullScreen(isFullScreen: boolean) {
    if (isFullScreen) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  setEnglishWord() {
    this.currentWord = this.aggregatedWords[this.index];
    this.englishWord = this.currentWord.word;
  }
  setTranslation() {
    if (Math.random() >= 0.5) {
      this.isCorrect = true;
      this.translation = this.aggregatedWords[this.index].wordTranslate;
    } else {
      this.isCorrect = false;
      let randomIndex = Math.random() * 100;
      while (randomIndex === this.index) {
        randomIndex = Math.random() * 100;
      }

      this.translation = this.aggregatedWords[Math.floor(randomIndex)].wordTranslate;
    }
  }
  next() {
    this.index++;
    this.setEnglishWord();
    this.setTranslation();
  }

  check(choice: boolean) {
    if (choice === this.isCorrect) {
      this.playSound('correct.mp3');
      this.gameService.pushCorrect(this.currentWord);
      this.setScore();
    } else {
      this.playSound('wrong.mp3');
      this.resetCoefficient();
    }
    this.next();
  }

  playSound(soundType: string) {
    if (!this.isMute) {
      let sound = new Audio(`../../../assets/audios/${soundType}`);
      sound.play();
    }
  }

  setScore() {
    this.totalPoints += this.coefficient * 10;
    if (this.rightInRow < 3) {
      this.rightInRow++;
    } else {
      this.coefficient++;
      this.rightInRow = 0;
    }
  }
  resetCoefficient() {
    this.rightInRow = 0;
    this.coefficient = 1;
  }

  startAnimation() {
    const timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
}
