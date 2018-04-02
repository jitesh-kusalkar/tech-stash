import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardService } from './dashboard.service';

@NgModule({
    imports: [CommonModule, DashboardRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    providers: [DashboardService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Done in order to use custom components in this
})
export class DashboardModule { }
