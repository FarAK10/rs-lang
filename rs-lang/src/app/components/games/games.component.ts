import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TutorialComponent } from '../tutorial/tutorial.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  constructor(private gameService: GameService, private localStorageService: LocalStorageService) {}
  card = [
    {
      icon: 'directions_run',
      title: 'games.sprint',
      game: 'sprint',
      description: 'games.descSprint',
      link: '/game/english-level',
    },
    {
      icon: 'queue_music',
      title: 'games.audioBattle',
      game: 'audio',
      description: 'games.descAudio',
      link: '/game/english-level',
    },
  ];

  setRoute(game: string) {
    this.gameService.isLaunchedFromMenu = true;
    this.localStorageService.setLocalStorage('isLaunchedFromMenu', JSON.stringify(true));
    this.gameService.setCurrentGame(game);
    console.log('games', game);
  }
}
