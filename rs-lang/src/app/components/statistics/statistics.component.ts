import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { HardWords } from 'src/app/interfaces/interfaces';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userWords: HardWords [] = []
  learnWords: number = 0
  allLearnedWords: number = 0
  persentCorrect = 40;
  arrSprintWords: HardWords [] = []
  sprintWords: number = 0
  arrSprintPercent: number [] = []
  sprintPercent: number = 0
  arrSprintSeries: number [] = []
  sprintSeries: number = 0
  arrAudioWords: HardWords [] = []
  audioWords: number = 0
  arrAudioPercent: number [] = []
  audioPercent: number = 0
  arrAudioSeries: number [] = []
  audioSeries: number = 0

  constructor (
    private apiService: ApiService, 
    private authService: AuthorizationService
  ) {}
 
  ngOnInit(): void {
    const idUser = this.authService.getUserId();
    this.apiService.getStat(idUser)
    .subscribe(userWords =>{
      console.log(userWords)
      this.userWords = userWords
      this.learnWords = this.userWords.filter(e => e.difficulty == "ease").length
      this.allLearnedWords = this.learnWords / 36

      console.log(this.allLearnedWords.toFixed(2))
    })
    this.apiService.getGameStats(idUser)
    .subscribe(gameStats =>{
      this.arrSprintWords = gameStats.optional.sprint.newWords
      this.arrSprintPercent = gameStats.optional.sprint.correctPercents
      this.arrSprintSeries = gameStats.optional.sprint.series
      this.sprintWords = this.arrSprintWords.length
      this.sprintPercent = this.arrSprintPercent.reduce((a, b) => a + b ) / this.arrSprintPercent.length;
      this.sprintSeries = Math.max.apply(null, this.arrSprintSeries)
      
      this.arrAudioWords = gameStats.optional.audio.newWords
      this.arrAudioPercent = gameStats.optional.audio.correctPercents
      this.arrAudioSeries = gameStats.optional.audio.series
      this.audioWords = this.arrAudioWords.length
      this.audioPercent = this.arrAudioPercent.reduce((a, b) => a + b ) / this.arrSprintPercent.length;
      this.audioSeries = Math.max.apply(null, this.arrAudioSeries)
    })
  };
}
