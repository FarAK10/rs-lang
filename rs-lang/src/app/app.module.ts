import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { SprintGameComponent } from './components/sprint-game/sprint-game.component';
import { EnglishLevelComponent } from './components/english-level/english-level.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';

const formsModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

const angularMaterailModules = [
  MatDialogModule,
  MatIconModule,
  MatSlideToggleModule,
  MatBadgeModule,
];

@NgModule({
  declarations: [
    AppComponent,
    AutorizationComponent,
    LoginComponent,
    RegisterComponent,
    SprintGameComponent,
    EnglishLevelComponent,
    GameSettingsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...angularMaterailModules,
    ...formsModules,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
