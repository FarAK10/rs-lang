import { Component } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {
  teamCard = [
    {photo: '../../assets/icons/ava1.png', hero: 'FarAK10', position: 'Team leader, Frontend developer', tasks:'Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page, "Audio Challenge" game, "Savannah" game, backend', link: 'https://github.com/FarAK10'},
    {photo: '../../assets/icons/ava2.png', hero: 'dimitrianderi', position: 'Frontend developer', tasks:'Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page, "Audio Challenge" game, "Savannah" game, backend', link: 'https://github.com/dimitrianderi'},
    {photo: '../../assets/icons/ava3.png', hero: 'jaha-iskhakov', position: 'Frontend developer', tasks:'Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page, "Audio Challenge" game, "Savannah" game, backend', link: 'https://github.com/jaha-iskhakov'},
  ]
}
