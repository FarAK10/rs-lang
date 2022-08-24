import { Component, Input, OnInit } from '@angular/core';
import { Level } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() levels!:Level[];
  @Input() parameters!:Level;

  onScroll () {
    const pagination: HTMLElement | null = document.querySelector('.cards__pagination');
    const list: HTMLElement | null = document.querySelector('.cards__levels');
    if (pagination!.offsetTop >= 180) {
      pagination?.classList.add('enable');
      list?.classList.add('enable');
    } else {
      pagination?.classList.remove('enable');
      list?.classList.remove('enable');
    } 
  }


  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

}
