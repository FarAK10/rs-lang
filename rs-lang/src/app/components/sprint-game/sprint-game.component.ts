import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, take, TimeInterval, windowWhen } from 'rxjs';
import { IAggregatedResp, IWord } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';
import { shuffle } from 'src/app/shared/functions';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-sprint-game',
  templateUrl: './sprint-game.component.html',
  styleUrls: ['./sprint-game.component.scss'],
})
export class SprintGameComponent implements OnInit, OnDestroy {
  constructor(private gameService: GameService, private router: Router) {}

  gameName: string = 'Sprint';

  level!: string;

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

  currentPage = 1;

  timer!: NodeJS.Timer;

  elem: HTMLElement = document.documentElement;

  wordsSub!: Subscription;

  ngOnInit(): void {
    this.gameService.reset();
    this.gameService.getWords();
    this.wordsSub = this.gameService.isWordsLoaded$.subscribe((isLoaded: boolean) => {
      console.log('is loaded', isLoaded);
      if (isLoaded) {
        this.aggregatedWords = shuffle(this.gameService.gameWords);
        console.log(this.aggregatedWords);
        this.setEnglishWord();
        this.setTranslation();
        this.startAnimation();
        this.setWordIndex();
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.wordsSub.unsubscribe();
  }

  @HostListener('window:keydown.ArrowLeft') arrowLeftEvent() {
    this.check(true);
  }

  @HostListener('window:keydown.ArrowRight') arrowRightEvent() {
    this.check(false);
  }

  setLevel(level: string) {
    this.level = level;
  }

  onMute(isMute: boolean) {
    this.isMute = isMute;
  }

  setWordIndex() {
    this.index = this.gameService.gameWords.length;
    console.log('index', this.index);
  }

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
      let randomIndex = Math.random() * this.aggregatedWords.length;
      while (randomIndex === this.index) {
        randomIndex = Math.random() * this.aggregatedWords.length;
      }

      this.translation = this.aggregatedWords[Math.floor(randomIndex)].wordTranslate;
    }
  }
  next() {
    if (this.index > 0) {
      this.index--;
      this.setEnglishWord();
      this.setTranslation();
    } else {
      this.stopGame();
    }
  }

  check(choice: boolean) {
    if (choice === this.isCorrect) {
      this.playSound('correct.mp3');
      this.gameService.pushCorrect(this.currentWord);
      this.setScore();
    } else {
      this.playSound('wrong.mp3');
      this.gameService.pushWrong(this.currentWord);
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
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        this.stopGame();
      }
    }, 1000);
  }

  stopGame() {
    clearInterval(this.timer);
    this.router.navigate([`game/result`]);
  }
}
