import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { HeaderModule } from './feature/header/header.module';
import { GroupModule } from './feature/group/group.module';
import { LoginModule } from './feature/login/login.module';
import { SharedModule } from './feature/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    DashboardModule,
    HeaderModule,
    GroupModule,
    LoginModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
