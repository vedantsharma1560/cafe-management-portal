import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserControlsRoutingModule } from './user-controls-routing.module';
import { UserControlsComponent } from './user-controls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserControlsComponent
  ],
  imports: [
    CommonModule,
    UserControlsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserControlsModule { }
