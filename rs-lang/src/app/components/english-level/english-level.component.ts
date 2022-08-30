import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
@Component({
  selector: 'app-english-level',
  templateUrl: './english-level.component.html',
  styleUrls: ['./english-level.component.scss'],
})
export class EnglishLevelComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  gameName!: string;

  levels = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2',
  ];

  ngOnInit(): void {
    this.gameService.currentGame$.pipe(take(1)).subscribe((name: string) => {
      this.gameName = name;
    });
  }

  setLevel(level: number) {
    this.gameService.setEnglishLevel(level);
    this.router.navigate([`game/${this.gameName}`]);
  }
}
