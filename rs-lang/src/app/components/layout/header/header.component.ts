import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  email: string = '';
  name: string = 'user';

  constructor(
    public sidebarService: SidebarService,
    public data: DataService,
    public authorizationService: AuthorizationService,
  ) {}
  ngOnInit(): void {
    this.data.name$.subscribe((v) => {
      this.name = v;
    });
  }
}
