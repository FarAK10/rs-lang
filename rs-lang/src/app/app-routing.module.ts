import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/layout/home/home.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  {
    path: 'game',
    loadChildren: () => import('./routings/game/game.module').then((mod) => mod.GameModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
