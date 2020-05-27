import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DUAL_INPUT, SINGLE_INPUT} from './app-routes';
import {SingleInputComponent} from './components/single-input/single-input.component';
import {DualInputComponent} from './components/dual-input/dual-input.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: SINGLE_INPUT,
    pathMatch: 'full'
  },
  {
    path: SINGLE_INPUT,
    component: SingleInputComponent,
  },
  {
    path: DUAL_INPUT,
    component: DualInputComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
