import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.scss'],
})
export class AutorizationComponent implements OnInit {
  constructor() {}
  isLogin = true;

  ngOnInit(): void {}

  isActive() {
    this.isLogin = !this.isLogin;
  }
}
