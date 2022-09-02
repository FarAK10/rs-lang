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
        'Проверьте, сколько очков вы можете получить за одну минуту, делая обоснованные предположения о том, что правильно, а что нет.',
      link: '/game/english-level',
    },
    {
      icon: 'queue_music',
      title: 'games.audioBattle',
      game: 'audio',
      description:
        'Проверьте свои навыки слушания, пытаясь подобрать правильное значение после услышанного слова. У вас есть только одна попытка.',
      link: '/game/english-level',
    },
  ];

  setRoute(game: string) {
    console.log('games', game);
    this.gameService.setCurrentGame(game);
  }
}
