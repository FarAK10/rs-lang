import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { flatMap } from 'rxjs';
@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.scss'],
})
export class AutorizationComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
}
