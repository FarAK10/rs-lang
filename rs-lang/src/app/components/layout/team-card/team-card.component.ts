import { Component } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {
  teamCard = [
    {photo: '../../assets/icons/ava1.png', hero: 'team.farakName', position: 'team.position1', tasks: 'team.farak', link: 'https://github.com/FarAK10'},
    {photo: '../../assets/icons/ava2.png', hero: 'team.dimitrianderiName', position: 'team.position2', tasks: 'team.dimitrianderi', link: 'https://github.com/dimitrianderi'},
    {photo: '../../assets/icons/ava3.png', hero: 'team.jahaName', position: 'team.position3', tasks: 'team.jaha', link: 'https://github.com/jaha-iskhakov'},
  ]
}
