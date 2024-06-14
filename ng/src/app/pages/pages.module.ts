import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SearchPipe } from '../shared/pipes/search.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxSpinnerModule,
  ],
  exports: [
    NgxSpinnerModule,
    HeaderComponent,
    SearchPipe
  ]
})
export class PagesModule { }
