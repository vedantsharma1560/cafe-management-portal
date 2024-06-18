import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserControlsComponent } from './user-controls.component';

const routes: Routes = [{ path: '', component: UserControlsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserControlsRoutingModule { }
