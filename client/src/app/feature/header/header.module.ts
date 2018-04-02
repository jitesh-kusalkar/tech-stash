import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
//import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { DashboardService } from './dashboard.service';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    providers: []
})
export class HeaderModule { }
