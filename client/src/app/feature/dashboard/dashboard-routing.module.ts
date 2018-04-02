import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
//import { AuthGuard } from '../shared/services/auth-guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'dashboard/:userId', component: DashboardComponent }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
