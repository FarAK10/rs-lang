import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = 'user';
  email: string = '';
  constructor(public sidebarService: SidebarService, public authorizationService: AuthorizationService) {
  }
  ngOnInit(): void {
  this.name = this.authorizationService.currentUser.name;
    
  }
}
