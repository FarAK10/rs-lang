import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/layout/home/home.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
<<<<<<< HEAD
  {path: '', component: HomeComponent},
  {path: 'tutorial', component: TutorialComponent, canActivate:[AuthGuard]}
,
  {
    path: 'game',
    loadChildren: () => import('./routings/game/game.module').then((mod) => mod.GameModule),
  },
>>>>>>> sprint-game
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
