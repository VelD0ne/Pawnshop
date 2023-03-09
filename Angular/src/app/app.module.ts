import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { LeaseComponent } from './lease/lease.component';
import { DealComponent } from './deal/deal.component';
import { ViewComponent } from './view/view.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [AppComponent, ClientComponent, CategoryComponent, ProductComponent, LeaseComponent, DealComponent, ViewComponent, ReportComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, Ng2SearchPipeModule, MatSortModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent, ClientComponent, CategoryComponent],
})
export class AppModule {}
