import { Component, OnInit } from '@angular/core';
import { IOption, IWord } from 'src/app/interfaces/interfaces';
import { AudioChallengeService } from 'src/app/services/audio-challenge.service';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export class AudioChallengeComponent implements OnInit {
  gameName: string = 'Audio-Challenge';

  level!: string;

  soundIcon: string = 'volume_mute';

  isMute: boolean = false;

  elem: HTMLElement = document.documentElement;

  imgLink!: string;

  defaultImgLink: string = '../../../assets/icons/wave-sound.png';

  currentEnglishWord: string = '';

  correctWord!: IWord;

  options!: IOption[];

  livesLeft: number = 5;

  isActiveBtn: string = 'default-btn';

  isAnswerShown: boolean = false;

  showBtnText: string = 'Show Answer';

  lives: Array<string> = [
    'favorite',
    'favorite',
    'favorite',
    'favorite',
    'favorite',
  ];

  constructor(
    private audioGameService: AudioChallengeService,
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.audioGameService.getWords();
    this.audioGameService.options.subscribe((options: IOption[]) => {
      this.options = options;
      this.correctWord = this.audioGameService.getCorrectWord();
      this.currentEnglishWord = this.correctWord.word;
    });
  }

  onMute(isMute: boolean) {
    this.isMute = isMute;
  }

  onFullScreen(isFullScreen: boolean) {
    if (isFullScreen) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  checkAnswer(translation: string) {
    const correctTranslation = this.correctWord.wordTranslate;
    if (correctTranslation === translation) {
      this.playSound('correct.mp3');
      this.gameService.pushCorrect(this.correctWord);
      this.isAnswerShown = true;
      this.toggleText();
    } else {
      this.playSound('wrong.mp3');
      this.onIncorrectAnswer();
    }
  }

  toggleText() {
    if (this.isAnswerShown) {
      this.showBtnText = 'next question';
    } else {
      this.showBtnText = 'Show answer';
    }
  }

  reduceNumberOfAttempts() {
    if (this.livesLeft === 0) {
      this.router.navigate([`game/result`]);
    } else {
      this.lives.splice(this.livesLeft, 1, 'favorite_border');
      this.livesLeft--;
    }
  }

  isWrong(className: string) {
    if (this.isAnswerShown) {
      return className;
    }
    return '';
  }

  playSound(soundType: string) {
    if (!this.isMute) {
      let sound = new Audio(`../../../assets/audios/${soundType}`);
      sound.play();
    }
  }

  showAnswer() {
    if (this.isAnswerShown) {
      this.onNextQuestion();
    } else {
      this.onIncorrectAnswer();
    }
    this.toggleText();
  }

  onIncorrectAnswer() {
    this.reduceNumberOfAttempts();
    this.gameService.pushWrong(this.correctWord);
    this.isAnswerShown = true;
    this.toggleText();
  }

  onNextQuestion() {
    this.audioGameService.checkPage();
    this.isAnswerShown = false;
  }
}
