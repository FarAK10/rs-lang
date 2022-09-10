import { Component} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  card = [
    {icon: 'format_color_text', title: 'card.titleTexbook', description: 'card.descTexbook'},
    {icon: 'g_translate', title: 'card.titleTutorial', description: 'card.descTutorial'},
    {icon: 'bar_chart', title: 'card.titleStat', description: 'card.descStat'},
    {icon: 'games', title: 'card.titleGames', description: 'card.descGames'}
  ]
}
