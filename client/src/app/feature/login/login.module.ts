import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginService } from './login.service';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [LoginService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Done in order to use custom components in this
})
export class LoginModule { }
