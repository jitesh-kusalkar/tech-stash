import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';
//import { AuthGuard } from '../shared/services/auth-guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'group/:groupId', component: GroupComponent }
        ])
    ],
    exports: [RouterModule]
})
export class GroupRoutingModule { }
