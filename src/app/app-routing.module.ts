import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroDataComponent } from './pages/intro-data/intro-data.component';
import { ChartsDataComponent } from './pages/charts-data/charts-data.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: IntroDataComponent, data: { state: 'IntroDataPage' } },
  { path: 'charts', component: ChartsDataComponent, data: { state: 'ChartsDataPage' } },
  { path: '404', component: NopagefoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
