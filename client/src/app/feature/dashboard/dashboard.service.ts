
import { Injectable } from '@angular/core';

import { ApiService } from '../shared/services/api.service';
import { APIRequest, APIMethod } from '../shared/models/api-request';

@Injectable()
export class DashboardService {

    constructor(
        private apiService: ApiService
    ) { }

    getDashboardInfo(userId: String) {
        let apiRequest = new APIRequest('api/user/' + userId, APIMethod.GET);
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    getPostById(postId: String) {
        let apiRequest = new APIRequest('api/post/' + postId, APIMethod.GET);
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    getAllUsers(domain: String = '') {
        let apiRequest = new APIRequest('api/user/all/' + domain, APIMethod.GET);
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    private errorHandler(error: any) {
        console.log(error);
    }

}