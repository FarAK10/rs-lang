import { Component, OnInit, OnDestroy } from '@angular/core';
import { IOption, IWord } from 'src/app/interfaces/interfaces';
import { AudioChallengeService } from 'src/app/services/audio-challenge.service';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscribable, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export class AudioChallengeComponent implements OnInit, OnDestroy {
  gameName: string = 'Audio-Challenge';

  level!: string;

  soundIcon: string = 'volume_mute';

  isMute: boolean = false;

  elem: HTMLElement = document.documentElement;

  defaultImgLink: string = '../../../assets/icons/wave-sound.png';

  imgLink: string = '../../../assets/icons/wave-sound.png';

  currentEnglishWord: string = '';

  correctWord!: IWord;

  options!: IOption[];

  livesLeft: number = 5;

  isActiveBtn: string = 'default-btn';

  isAnswerShown: boolean = false;

  showBtnText: string = 'Show Answer';

  baseUrl!: string;

  optionsSub$!: Subscription;

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
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.gameService.reset();
    this.audioGameService.getWords();
    this.optionsSub$ = this.audioGameService.options$.pipe().subscribe((options: IOption[]) => {
      this.options = options;
      console.log(options);
      if (this.options.length) {
        this.correctWord = this.audioGameService.getCorrectWord();
        this.playPronunciation();
      }
    });

    this.baseUrl = this.apiService.getBaseUrl();
  }

  ngOnDestroy(): void {
    this.optionsSub$.unsubscribe();
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
      this.onRightAnswer();
    } else {
      this.playSound('wrong.mp3');
      this.onIncorrectAnswer();
    }
  }

  toggle() {
    if (this.isAnswerShown) {
      this.showBtnText = 'next question';
      this.imgLink = `${this.baseUrl}/${this.correctWord.image}`;
      this.currentEnglishWord = this.correctWord.word;
    } else {
      this.showBtnText = 'Show answer';
      this.imgLink = this.defaultImgLink;
      this.currentEnglishWord = '';
    }
  }

  reduceNumberOfAttempts() {
    if (this.livesLeft === -1) {
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

  playPronunciation() {
    const url = `${this.baseUrl}/${this.correctWord.audio}`;
    const audio = new Audio(url);
    audio.play();
  }

  showAnswer() {
    if (this.isAnswerShown) {
      this.onNextQuestion();
    } else {
      this.onIncorrectAnswer();
    }
    this.toggle();
  }

  onIncorrectAnswer() {
    this.reduceNumberOfAttempts();
    this.gameService.pushWrong(this.correctWord);
    this.isAnswerShown = true;
    this.toggle();
  }

  onRightAnswer() {
    this.gameService.pushCorrect(this.correctWord);
    this.isAnswerShown = true;
    this.toggle();
  }

  onNextQuestion() {
    this.audioGameService.nextQuestion();
    this.isAnswerShown = false;
  }
}
