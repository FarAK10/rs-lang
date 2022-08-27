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
import { SprintGameComponent } from './components/sprint-game/sprint-game.component';
import { EnglishLevelComponent } from './components/english-level/english-level.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';
import { GameResultComponent } from './shared/components/game-result/game-result.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { WordComponent } from './shared/components/word/word.component';
import { AudioChallengeComponent } from './components/audio-challenge/audio-challenge.component';
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
    SprintGameComponent,
    EnglishLevelComponent,
    GameSettingsComponent,
    GameResultComponent,
    WordComponent,
    AudioChallengeComponent,
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
    ...angularMaterailModules,
    ...formsModules,
    NgCircleProgressModule.forRoot({}),
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
