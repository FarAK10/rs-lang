import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  constructor(private gameService: GameService) {}
  card = [
    {
      icon: 'directions_run',
      title: 'games.sprint',
      game: 'sprint',
      description:
        'games.descSprint',
      link: '/game/english-level',
    },
    {
      icon: 'queue_music',
      title: 'games.audioBattle',
      game: 'audio',
      description:
        'games.descAudio',
      link: '/game/english-level',
    },
  ];

  setRoute(game: string) {
    console.log('games', game);
    this.gameService.setCurrentGame(game);
  }
}
