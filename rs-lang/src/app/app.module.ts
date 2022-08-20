import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomModule } from 'src/app/modules/custom/custom.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarService } from './services/sidebar.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
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
