import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {
  card = [
    {icon: 'directions_run', title: 'Спринт', description: 'Проверьте, сколько очков вы можете получить за одну минуту, делая обоснованные предположения о том, что правильно, а что нет.', link:'/game/english-level'},
    {icon: 'queue_music', title: 'Аудио-вызов', description: 'Проверьте свои навыки слушания, пытаясь подобрать правильное значение после услышанного слова. У вас есть только одна попытка.', link:'#'},
  ]
}
