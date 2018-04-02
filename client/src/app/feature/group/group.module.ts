import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GroupService } from './group.service';

@NgModule({
    imports: [CommonModule, GroupRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
    declarations: [GroupComponent],
    exports: [GroupComponent],
    providers: [GroupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Done in order to use custom components in this
})
export class GroupModule { }
