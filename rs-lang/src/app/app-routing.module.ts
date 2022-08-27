import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/layout/home/home.component';
import { GamesComponent } from './components/games/games.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'tutorial/words', component: CardsComponent },
  { path: 'games', component: GamesComponent },
  {
    path: 'game',
    loadChildren: () => import('./routings/game/game.module').then((mod) => mod.GameModule),
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
