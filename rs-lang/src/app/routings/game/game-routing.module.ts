import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnglishLevelComponent } from 'src/app/components/english-level/english-level.component';
import { SprintGameComponent } from 'src/app/components/sprint-game/sprint-game.component';
import { GameResultComponent } from 'src/app/shared/components/game-result/game-result.component';

const routes: Routes = [
  {
    path: 'english-level',
    component: EnglishLevelComponent,
  },
  {
    path: 'sprint',
    component: SprintGameComponent,
  },
  {
    path: 'result',
    component: GameResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
