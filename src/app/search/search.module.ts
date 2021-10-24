import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    SearchComponent,
    DetailsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
