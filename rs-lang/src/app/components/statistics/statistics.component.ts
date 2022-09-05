import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { HardWords, IUserStatista } from 'src/app/interfaces/interfaces';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  userWords: HardWords[] = [];
  learnWords: number = 0;
  allLearnedWords: number = 0;
  persentCorrect = 40;
  arrSprintWords: HardWords[] = [];
  sprintWords: number = 0;
  arrSprintPercent: number[] = [];
  sprintPercent: number = 0;
  arrSprintSeries: number[] = [];
  sprintSeries: number = 0;
  arrAudioWords: HardWords[] = [];
  audioWords: number = 0;
  arrAudioPercent: number[] = [];
  audioPercent: number = 0;
  arrAudioSeries: number[] = [];
  audioSeries: number = 0;

  constructor(private apiService: ApiService, private authService: AuthorizationService) {}

  ngOnInit(): void {
    const idUser = this.authService.getUserId();
    this.apiService.getStat(idUser).subscribe((userWords) => {
      // console.log(userWords);
      this.userWords = userWords;
      this.learnWords = this.userWords.filter((e) => e.difficulty == 'ease').length || 0;
      this.allLearnedWords = this.learnWords / 36;
    });
    const lastDateStatista = this.authService.getLastDateStatista();
    this.arrSprintWords = lastDateStatista.sprint.newWords;
    this.arrSprintPercent = lastDateStatista.sprint.correctPercents;
    this.arrSprintSeries = lastDateStatista.sprint.series;
    this.sprintWords = this.arrSprintWords.length;
    this.sprintPercent = Math.round(
      this.arrSprintPercent.reduce((a, b) => a + b, 0) / this.arrSprintPercent.length,
    );
    this.sprintSeries = Math.max.apply(null, this.arrSprintSeries) || 0;

    this.arrAudioWords = lastDateStatista.audio.newWords;
    this.arrAudioPercent = lastDateStatista.audio.correctPercents;
    this.arrAudioSeries = lastDateStatista.audio.series;
    this.audioWords = this.arrAudioWords.length;
    this.audioPercent = Math.round(
      this.arrAudioPercent.reduce((a, b) => a + b, 0) / this.arrSprintPercent.length,
    );
    this.audioSeries = Math.max.apply(null, this.arrAudioSeries);
    if (this.audioSeries === -Infinity) {
      this.audioSeries = 0;
    }
    if (this.sprintSeries === -Infinity) {
      this.sprintSeries = 0;
    }
    if (!this.audioPercent) {
      this.audioPercent = 0;
    }
    if (!this.sprintPercent) {
      this.sprintPercent = 0;
    }
  }
}
