import { Component } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { LocalStorageService } from './services/local-storage.service';
import { OnInit } from '@angular/core';
import { Level, Word } from './interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'rs-lang';

  constructor(
    public data: DataService,
    private authSerice: AuthorizationService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(this.localStorageService.getLocalStorage('user') as string);
    if (user) {
      this.authSerice.currentUser = user;
    }
  }
}
