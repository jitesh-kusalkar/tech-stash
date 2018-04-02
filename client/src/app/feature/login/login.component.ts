import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { LoginService } from './login.service';
import { DataService } from '../shared/services/data.service';
import { SessionService } from '../shared/services/session.service';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    registerUserForm: any = {};
    loginUserForm: any = {};
    signup = false;

    constructor(private router: Router, private dashboardService: LoginService,
        private dataService: DataService, private sessionService: SessionService) {
        this.clearForm();
        document.body.style.backgroundColor = '#76b852'; // To set background green
    }

    login(form: any) {
        if (form.valid) {
            this.dashboardService.login(this.loginUserForm).then((res: any) => {
                let response = JSON.parse(window.atob(res.accessToken.split('.')[1]));
                this.sessionService.setContext(res);
                this.router.navigate(['/dashboard', response.id]);
            });
        }
    }

    register(form: any) {
        if (form.valid) {
            this.dashboardService.register(this.registerUserForm).then(res => {
                console.log(res);
                this.signup = false;
            });
        }
    }

    toggleForm() {
        this.signup = !this.signup;
        this.clearForm();
    }

    clearForm() {
        this.registerUserForm = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            emailId: ''
        };

        this.loginUserForm = {
            username: '',
            password: ''
        };
    }
}
