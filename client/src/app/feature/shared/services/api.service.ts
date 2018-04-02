// All Imports
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { APIRequest, APIMethod } from '../models/api-request';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SessionService } from './session.service';

/**
 * Service for manage API executions like GET, POST, PUT, DELETE.
 * [Injectable description] -> Annotation to indicate that service will be injectale in application.
 */
@Injectable()
export class ApiService {
    result: string;
    baseURl: string = environment.API_URL;
    headers: Headers;
    pendingRequests: any[] = [];

    /**
     * Constructor for ApiService.
     * @param {Http} public apiExecuter [HTTP client to execute methods like GET, POST, PUT, DELETE]
     */
    constructor(public apiExecuter: Http, private sessionService: SessionService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    /**
     * Executes Post request.
     * @param {RequestDataModel} requestDataModel [Model to get metadata of request.]
     */
    execute(apiRequest: APIRequest) {
        return this.executeAPI(apiRequest);
    }

    executeAPI(apiRequest: APIRequest) {
        this.populateHeaders();
        switch (apiRequest.method) {
            case APIMethod.GET:
                return this.apiExecuter.get(this.baseURl + apiRequest.endpoint, { headers: this.headers })
                    .map(res => this.handleResponse(res));

            case APIMethod.POST:
                return this.apiExecuter.post(this.baseURl + apiRequest.endpoint, apiRequest.getBody
                    (), { headers: this.headers })
                    .map(res => this.handleResponse(res));

            case APIMethod.PUT:
                return this.apiExecuter.put(this.baseURl + apiRequest.endpoint, apiRequest.getBody
                    (), { headers: this.headers })
                    .map(res => this.handleResponse(res));

            case APIMethod.DELETE:
                return this.apiExecuter.delete(this.baseURl + apiRequest.endpoint, { headers: this.headers })
                    .map(res => this.handleResponse(res));

            case APIMethod.IMAGE_GET:
                return this.apiExecuter.get(this.baseURl + apiRequest.endpoint, { headers: this.headers });

            default:
                return this.apiExecuter.get(this.baseURl + apiRequest.endpoint, { headers: this.headers })
                    .map(res => res.json());
        }
    }

    populateHeaders() {
        //this.headers.append('Access-Control-Allow-Origin', '*');
        if (this.sessionService.getAccessToken() && null !== this.sessionService.getAccessToken()) {
            this.headers.set('Authorization', 'Bearer ' + this.sessionService.getAccessToken());
        } else {
            this.headers.delete('Authorization');
        }
    }

    handleResponse(res: any) {
        if (res.status === 204) {
            return {};
        } else {
            return res.json();
        }
    }
}
