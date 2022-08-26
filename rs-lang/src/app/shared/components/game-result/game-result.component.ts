import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IWord } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  persentCorrect = 40;

  totalWordsNumber = 30;

  mistakesNumber = 12;

  correctAnswersNumber = 13;

  correctAnswers: IWord[] = [];

  incorrectAnswers: IWord[] = [];

  ngOnInit(): void {
    this.correctAnswers = this.gameService.correctAnswers;
    this.incorrectAnswers = this.gameService.incorrectAnswers;
    this.setValues();
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
    this.router.navigate(['./game/sprint']);
  }
}
