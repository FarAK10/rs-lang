import { Component, Input, OnInit } from '@angular/core';
import { Level, Word } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  constructor(
    public data: DataService,
    public apiService: ApiService,
  ) {}

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

  onCheck(e: Event) {
    const target = e.target as HTMLElement;
    this.data.currentLevel = Object.assign({}, this.data.levels[Number(target.id)]);
    this.apiService.getWords(String(this.data.currentLevel.id), '0').subscribe(value => this.data.words = value);
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

}
