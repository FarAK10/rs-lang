import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

const routes: Routes = [
  {path: 'tutorial', component: TutorialComponent},
  {path: 'tutorial/words', component: CardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
