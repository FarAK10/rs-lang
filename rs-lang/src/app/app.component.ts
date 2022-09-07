import { Component } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { LocalStorageService } from './services/local-storage.service';
import { OnInit } from '@angular/core';
import { INewUser, IUserStatista, IWord } from './interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { GameService } from './services/game.service';
import { TranslateService } from '@ngx-translate/core';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rs-lang';
  gameName!: string;

  constructor(
    public data: DataService,
    private authSerice: AuthorizationService,
    private localStorageService: LocalStorageService,
    private gameService: GameService,
    private translateService: TranslateService,
  ) {
    this.translateService.setDefaultLang(data.lang!);
  }

  ngOnInit(): void {
    this.setUser();
    this.setNewUser();
    this.setCorrectAnswers();
    this.setWrongAnswers();
    this.setGameName();
    this.setCorrectSeries();
    this.setUserStatista();
  }

  setUser() {
    const user = JSON.parse(this.localStorageService.getLocalStorage('user') as string);
    if (user) {
      this.authSerice.setCurrentUser(user);
    }
  }

  setNewUser() {
    const newUser = JSON.parse(
      this.localStorageService.getLocalStorage('newUser') as string,
    ) as INewUser;
    if (newUser) {
      this.authSerice.singIn(newUser);
      this.authSerice.onRefreshPage(true);
    }
  }

  setCorrectAnswers() {
    const correctAnswers = JSON.parse(
      this.localStorageService.getLocalStorage('correctAnswers') as string,
    ) as IWord[];
    if (correctAnswers) {
      this.gameService.setCorrectAnswers(correctAnswers);
    }
  }

  setWrongAnswers() {
    const wrongAnswers = JSON.parse(
      this.localStorageService.getLocalStorage('wrongAnswers') as string,
    ) as IWord[];
    if (wrongAnswers) {
      this.gameService.setWrongAnswers(wrongAnswers);
    }
  }

  setGameName() {
    this.gameName = this.localStorageService.getLocalStorage('gameName') as string;
    if (this.gameName) {
      this.gameService.setCurrentGame(this.gameName);
    }
  }

  gamesLaunched() {
    this.gameService.isLaunchedFromMenu = JSON.parse(
      this.localStorageService.getLocalStorage('isLaunchedFromMenu') as string,
    ) as boolean;
  }

  setCorrectSeries() {
    const sprintCorrectSeries = JSON.parse(
      this.localStorageService.getLocalStorage('sprintCorrectSeries') as string,
    ) as number[];
    const audiCorrectSeries = JSON.parse(
      this.localStorageService.getLocalStorage('audioCorrectSeries') as string,
    ) as number[];

    if (sprintCorrectSeries) {
      this.gameService.setSeries(sprintCorrectSeries, 'sprint');
    }
    if (audiCorrectSeries) {
      this.gameService.setSeries(audiCorrectSeries, 'audio');
    }
  }

  setUserStatista() {
    const userStatista = JSON.parse(
      this.localStorageService.getLocalStorage('userStatistics') as string,
    ) as IUserStatista;
    if (userStatista) {
      this.authSerice.currentUserStatista = userStatista;
    }
  }
}
