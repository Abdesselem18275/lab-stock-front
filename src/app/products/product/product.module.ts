import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material';
import { ReactiveFormsModule } from '@angular/forms';

import {SharedModule} from 'src/app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductNavbarComponent } from './product-navbar/product-navbar.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductNewComponent } from './product-new/product-new.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [
    ProductHomeComponent,
    ProductComponent,
    ProductListComponent,
    ProductNavbarComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    ProductNewComponent
  ]

})
export class ProductModule { }
