
import { Injectable } from '@angular/core';

import { ApiService } from '../shared/services/api.service';
import { APIRequest, APIMethod } from '../shared/models/api-request';

@Injectable()
export class LoginService {

    constructor(
        private apiService: ApiService
    ) { }

    login(user: any) {
        let apiRequest = new APIRequest('api/user/login', APIMethod.POST);
        for(let key in user) {
            apiRequest.addProperty(key, user[key]);
        }
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    register(user: any) {
        let payload = this.transform(user);
        let apiRequest = new APIRequest('api/user/register', APIMethod.POST);
        for(let key in payload) {
            apiRequest.addProperty(key, payload[key]);
        }
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    transform(user: any) {
        return {
            username: user.username,
            password: user.password,
            about: {
                firstname: user.firstname,
                lastname: user.lastname,
                dob: user.dob || '',
                gender: user.gender || '',
                emailId: user.emailId
            }
        };
    }

    private errorHandler(error: any) {
        console.log(error);
    }
}