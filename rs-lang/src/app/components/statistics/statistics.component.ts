import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardWords, IWord } from 'src/app/interfaces/interfaces';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userWords: HardWords [] = []
  learnWords: number = 0
  learnedWords: number = 0
  persentCorrect = 40;

  constructor (private apiService: ApiService, private authService: AuthorizationService) {}
 
  ngOnInit(): void {
    const idUser = this.authService.getUserId();
    this.apiService.getStat(idUser)
    .subscribe(userWords =>{
      this.userWords = userWords
      this.learnWords = this.userWords.filter(e => e.difficulty == "ease").length
      this.learnedWords = this.learnWords / 2
    })
  };
}
