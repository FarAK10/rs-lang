import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IWord } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit, OnDestroy {
  constructor(private gameService: GameService, private router: Router) {}

  persentCorrect = 40;

  totalWordsNumber = 30;

  mistakesNumber = 12;

  correctAnswersNumber = 13;

  correctAnswers: IWord[] = [];

  incorrectAnswers: IWord[] = [];

  currentGame: string = '';

  gameServiceSub!: Subscription;

  ngOnInit(): void {
    this.correctAnswers = this.gameService.correctAnswers;
    this.incorrectAnswers = this.gameService.incorrectAnswers;
    this.setValues();
    this.gameServiceSub = this.gameService.currentGame$.subscribe((gameName: string) => {
      this.currentGame = gameName;
      console.log(gameName, 'result');
      console.log(this.currentGame);
    });
  }

  ngOnDestroy(): void {
    this.gameServiceSub.unsubscribe();
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

  navigate(): void {
    this.router.navigate([`./game/${this.currentGame}`]);
  }
}
