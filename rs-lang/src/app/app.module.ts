import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomModule } from 'src/app/modules/custom/materials.module'
import { HeaderComponent } from './components/layout/header/header.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarService } from './services/sidebar.service';
import { HomeComponent } from './components/layout/home/home.component';
import { CardComponent } from './components/layout/card/card.component';
import { TeamCardComponent } from './components/layout/team-card/team-card.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TutorialComponent } from './tutorial/tutorial.component';
import { AutorizationComponent } from './components/autorization/autorization.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthModule } from './routings/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import HeaderInterceptor from './services/header.interceptor';

const formsModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

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
    TutorialComponent,
    AutorizationComponent,
    LoginComponent,
    RegisterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomModule,
    MatButtonModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...formsModules,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    SidebarService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
