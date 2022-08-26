import { Component, OnInit, Input } from '@angular/core';
import { IWord } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  @Input() word!: IWord;

  baseUrl!: string;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.baseUrl = this.apiService.getBaseUrl();
  }

  playAudio() {
    const url = `${this.baseUrl}/${this.word.audio}`;
    const audio = new Audio(url);
    audio.play();
  }
}
