import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from '../material';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock/stock.component';
import { StockListComponent } from './stock-list/stock-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule ,
    StockRoutingModule
  ],
  declarations: [StockComponent, StockListComponent]
})
export class StockModule { }