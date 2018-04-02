// Imports
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { APIMethod } from '../models/api-request';

/**
 * Service for managing the data needed via run time
 * [Injectable]-> Annotation to indicate that service will be injectale in application.
 */
@Injectable()
export class DataService {

    constructor(private http: Http) { }

    getMockData() {
        let url = './assets/mock.json';
        return this.http.get(url)
            .map(res => res.json()).toPromise()
            .catch(this.errorHandler.bind(this));
    }

    setUserInformation(userInfo: any) {
        localStorage.setItem('user', JSON.stringify(userInfo));
    }

    getUserInformation() {
        return JSON.parse(localStorage.getItem('user'));
    }

    private errorHandler(error: any) {
        console.log(error);
    }
}
