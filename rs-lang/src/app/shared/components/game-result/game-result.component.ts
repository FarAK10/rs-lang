import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IWord } from 'src/app/interfaces/interfaces';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private authService: AuthorizationService,
    private userService: UserService,
    private router: Router,
  ) {}

  persentCorrect = 40;

  totalWordsNumber = 30;

  mistakesNumber = 12;

  correctAnswersNumber = 13;

  correctAnswers: IWord[] = [];

  incorrectAnswers: IWord[] = [];

  currentGameName: string = '';

  correctInRow!: number;

  gameServiceSub!: Subscription;

  ngOnInit(): void {
    this.correctAnswers = this.gameService.correctAnswers;
    this.incorrectAnswers = this.gameService.incorrectAnswers;
    this.setValues();
    this.currentGameName = this.gameService.getGameName();
    this.setSeries();
    if (this.authService.isAuth) {
      this.userService.setGameStatistics(
        this.currentGameName,
        this.persentCorrect,
        this.correctInRow,
      );
    }
  }
  setValues(): void {
    this.mistakesNumber = this.incorrectAnswers.length;
    this.correctAnswersNumber = this.correctAnswers.length;
    this.totalWordsNumber = this.mistakesNumber + this.correctAnswersNumber;
    this.setProgress();
  }
  setProgress(): void {
    this.persentCorrect = Math.floor((this.correctAnswersNumber / this.totalWordsNumber) * 100);
  }

  setSeries(): void {
    let series: number[];
    if (this.currentGameName === 'sprint') {
      series = this.gameService.sprintCorrectSeries;
    } else {
      series = this.gameService.audioCorrectSerices;
    }
    this.correctInRow = Math.max(...series);
  }

  navigate(): void {
    if (this.gameService.isLaunchedFromMenu) {
      this.router.navigate([`./game/${this.currentGameName}`]);
    } else {
      this.router.navigate([`./tutorial/words`]);
    }
  }
}
