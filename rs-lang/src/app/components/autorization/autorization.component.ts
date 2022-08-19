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
  isLogin = true;

  ngOnInit(): void {
    if (this.location.path() === '/login') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  isActive() {
    this.isLogin = !this.isLogin;
  }
}
