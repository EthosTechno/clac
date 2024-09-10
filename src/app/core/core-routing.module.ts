import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FournotfourComponent } from './components/fournotfour/fournotfour.component';

const routes: Routes = [
  { path: '404', component: FournotfourComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
