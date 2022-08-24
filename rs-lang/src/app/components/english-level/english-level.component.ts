import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-english-level',
  templateUrl: './english-level.component.html',
  styleUrls: ['./english-level.component.scss'],
})
export class EnglishLevelComponent implements OnInit {
  constructor() {}
  @Output() levelSelected = new EventEmitter<string>();

  @Input() gameName!: string;

  levels = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2',
  ];

  ngOnInit(): void {}

  setLevel(level: string) {
    this.levelSelected.emit(level);
  }
}
