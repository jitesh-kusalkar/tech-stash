
import { Injectable } from '@angular/core';

import { ApiService } from '../shared/services/api.service';
import { APIRequest, APIMethod } from '../shared/models/api-request';

@Injectable()
export class GroupService {

    constructor(
        private apiService: ApiService
    ) { }

    getGroupById(groupId: String) {
        let apiRequest = new APIRequest('api/group/' + groupId, APIMethod.GET);
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

    createPost(post: any) {
        let apiRequest = new APIRequest('api/post/', APIMethod.POST);
        for(let key in post) {
            apiRequest.addProperty(key, post[key]);
        }
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    postToUser(post: any, userId: String) {
        let apiRequest = new APIRequest('api/post/user/' + userId, APIMethod.POST);
        for(let key in post) {
            apiRequest.addProperty(key, post[key]);
        }
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    postToGroup(post: any, groupId: String) {
        let apiRequest = new APIRequest('api/post/group/' + groupId, APIMethod.POST);
        for(let key in post) {
            apiRequest.addProperty(key, post[key]);
        }
        return this.apiService.execute(apiRequest).toPromise()
            .then(res => res)
            .catch(this.errorHandler.bind(this));
    }

    private errorHandler(error: any) {
        console.log(error);
    }

}