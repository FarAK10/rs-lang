import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService,
    public data: DataService,
    ) { 
    
  }

  ngOnInit(): void {
  }

}
