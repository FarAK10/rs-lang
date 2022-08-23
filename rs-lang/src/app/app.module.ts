import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomModule } from 'src/app/modules/custom/materials.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarService } from './services/sidebar.service';
import { HomeComponent } from './components/layout/home/home.component';
import { CardComponent } from './components/layout/card/card.component';
import { TeamCardComponent } from './components/layout/team-card/team-card.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    HomeComponent,
    CardComponent,
    TeamCardComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomModule,
  ],
  providers: [
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
